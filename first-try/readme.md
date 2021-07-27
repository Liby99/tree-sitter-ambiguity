# Usage

```
npm install
./node_modules/.bin/tree-sitter generate
./node_modules/.bin/tree-sitter parse tests/binding.rel
```

In case you want to know more about tree sitter parsing

```
./node_modules/.bin/tree-sitter parse --help
```

One useful command is

```
./node_modules/.bin/tree-sitter parse --debug tests/binding.rel
```

# Syntax

```
f(a, b) // call

a // id

a, b // tuple

a:b(c, d) // qualified name ("a:b")

a: b(a, d) // binding "a", expr "b(a, d)"

a, b: f(a, b) // binding ["a", "b"], expr "f(a, b)"

a, b:f(c, d) // tuple ["a", call (qualified name "b:f" "(c, d)")]
```

# Ambiguity

In the following program

```
a, b:f(c, d)
```

it is recognized as a binding (on two variables):

```
(top_level [0, 0] - [1, 0]
  (expr [0, 0] - [0, 12]
    (binding [0, 0] - [0, 12]
      (id [0, 0] - [0, 1])
      (id [0, 3] - [0, 4])
      (expr [0, 5] - [0, 12]
        (no_comma_expr [0, 5] - [0, 12]
          (call [0, 5] - [0, 12]
            (no_comma_expr [0, 5] - [0, 6]
              (id [0, 5] - [0, 6]))
            (no_comma_expr [0, 7] - [0, 8]
              (id [0, 7] - [0, 8]))
            (no_comma_expr [0, 10] - [0, 11]
              (id [0, 10] - [0, 11]))))))))
```

where it is expected to be recognized as a tuple.
