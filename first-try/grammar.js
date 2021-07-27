const NO_COMMA_EXPR = 2
const ID = 2
const QUALIFIED_NAME = 3
const BINDING = 4
const TUPLE = -1

module.exports = grammar({
  name: 'G3',
  extras: $ => [/\s/],
  rules: {
    top_level: $ => $.expr,
    expr: $ => choice(
      $.no_comma_expr,
      $.binding,
      $.tuple,
    ),
    no_comma_expr: $ => prec(NO_COMMA_EXPR, choice(
      $.id,
      $.qualified_name,
      $.call,
    )),
    id: $ => token(prec(ID, /[a-zA-Z][a-zA-Z0-9_]*/)),
    qualified_name: $ => token(prec(QUALIFIED_NAME, /[a-zA-Z][a-zA-Z0-9_]*(:[a-zA-Z][a-zA-Z0-9_]*)+/)),
    call: $ => choice(
      seq($.no_comma_expr, "(", $.no_comma_expr, repeat(seq(",", $.no_comma_expr)), ")"),
      seq($.no_comma_expr, "(", ")"),
    ),
    binding: $ => prec.left(BINDING, seq($.id, repeat(seq(",", $.id)), ":", $.expr)),
    tuple: $ => prec(TUPLE, seq($.no_comma_expr, repeat(seq(",", $.no_comma_expr)))),
  },
});
