'use strict'

module.exports = split
module.exports.split = split
module.exports.join = join

function split (obj, opts) {
  opts = opts || {}
  var keyName = opts.key || 'key'
  var valueName = opts.value || 'value'
  var items = []
  for (var key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    var kv = {}
    kv[keyName] = key
    kv[valueName] = obj[key]
    items.push(kv)
  }
  return items
}

function join (arr, opts) {
  opts = opts || {}
  var keyName = opts.key || 'key'
  var valueName = opts.value || 'value'
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    obj[item[keyName]] = item[valueName]
  }
  return obj
}
