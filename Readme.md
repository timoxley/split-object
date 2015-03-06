# split-object

[![Build Status](https://travis-ci.org/timoxley/split-object.svg?branch=master)](https://travis-ci.org/timoxley/split-object)

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

// transform each key/value using Array.prototype.map
var loudIngredients = split(salad).map(function(ingredient) {
  ingredient.key = ingredient.key.toUpperCase()
  ingredient.value *= 3
  return ingredient
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

## Custom Key/Value Names

To provide more semantic key/value names, supply a second argument to
either `split` or `join` with the key/value mapping:
```js
var salad = {
  apples: 1,
  bananas: 3,
  carrots: 2
}

var loudIngredients = split(salad, {key: 'name', value: 'amount'}).map(function(ingredient) {
  ingredient.name = ingredient.name.toUpperCase()
  ingredient.amount *= 3
  return ingredient
})

// loudIngredients:
// [
//   { name: 'APPLES', amount: 3 },
//   { name: 'BANANAS', amount: 9 },
//   { name: 'CARROTS', amount: 6 }
// ]

var loudSalad = split.join(loudIngredients, {key: 'name', value: 'amount'})

// loudSalad:
// {
//    APPLES: 3,
//    BANANAS: 9,
//    CARROTS: 6
// }
//

```

This also means you can use `join` to create an Object out of any Array
of Objects with two properties.

Remember to also supply the mapping to join otherwise it won't be able to find the correct key/value pair to re-form the object.

## See Also

* [hughsk/flat](https://github.com/hughsk/flat) – Flatten/unflatten nested Javascript objects (Highly recommended for use with `split-object`).

## License

MIT
