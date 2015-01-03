"use strict"

module.exports = split
module.exports.split = split
module.exports.join = join

function split(obj) {
  var items = []
  for (var key in obj) {
    items.push({key: key, value: obj[key]})
  }
  return items
}

function join(arr) {
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    obj[item.key] = item.value
  }
  return obj
}
