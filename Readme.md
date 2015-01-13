# split-object

Minimal tool for working with Objects using built-in functional Array
methods.

`split-object` will split an Object into an Array of keys & values,
allowing you to manipulate the Object using Array methods then join
values back into an Object.

In comparison to `for..in` or `Object.keys().forEach()` an Array of the
form `[{key1: value1}, {key2: value2}]` can be a far more natural &
convenient structure to work with.

`split-object` has both a `split` and a `join` method, similar to how
`String#split`/`Array#join` combine to convert back & forward between
Strings & Arrays.

[Post ES6](https://esdiscuss.org/topic/es6-iteration-over-object-values) we
might see some better methods for iterating over Objects.

## Installation

```
npm install split-object
```

## Usage

```js
var salad = {
  apples: 1,
  bananas: 3,
  carrots: 2
}

var loudIngredients = split(salad).map(function(ingredient) {
  return {
    key:   ingredient.key.toUpperCase(),
    value: ingredient.value * 3
  }
})

// loudIngredients:
// [
//   { key: 'APPLES', value: 3 },
//   { key: 'BANANAS', value: 9 },
//   { key: 'CARROTS', value: 6 }
// ]

var loudSalad = split.join(loudIngredients)

// loudSalad:
// {
//    APPLES: 3,
//    BANANAS: 9,
//    CARROTS: 6
// }
//
```

## Examples

### Iterating Keys & Values

```js
// with object-split
split(salad).forEach(function(item) {
  console.log(item.key, item.value)
})
```

```js
// without object-split
Object.keys(salad).forEach(function(key) {
  var value = salad[key]
  console.log(key, value)
})

// or
for (var key in salad) {
  var value = salad[key]
  console.log(key, value)
}
```

### Chaining Transformations

```js
// with object-split
var pieces = split(salad)
.map(function(kv) {
  kv.value = calculate(kv.value)
  return kv
})
.map(function(kv) {
  kv.value = recalculate(kv.value)
  return kv
})
var newSalad = split.join(pieces)
```

Without splitting the Object into a similar structure to `split-object`, you're
stuck with losing the keys (which is acceptable if you can deduce keys from the
value) or using multiple `reduce` calls/`for..of` iteration:

```js
// without object-split
var newSalad = Object.keys(salad)
.reduce(function(obj, key) {
  var value = salad[key]
  obj[key] = calculate(value)
  return obj
}, {})
newSalad = Object.keys(newSalad)
.reduce(function(obj, key) {
  var value = newSalad[key]
  obj[key] = recalculate(value)
  return obj
}, {})
```

`split-object` doesn't save a huge number of lines, but it
saves some complexity, enables easier chaining and removes the hassle
of extracting the value from the object on each iteration.

## License

MIT
