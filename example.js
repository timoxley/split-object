var split = require('./')

var salad = {
  apples: 1,
  bananas: 3,
  carrots: 2
}

var loudIngredients = split(salad).map(function (ingredient) {
  return {
    key: ingredient.key.toUpperCase(),
    value: ingredient.value * 3
  }
})

inspect('loud ingredients', loudIngredients)

var loudSalad = split.join(loudIngredients)

inspect('loud salad', loudSalad)

function inspect (msg, item) {
  console.log(msg + '\n', require('util').inspect(item, {colors: true, depth: 30}))
  return item
}
