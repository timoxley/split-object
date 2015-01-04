"use strict"

var test = require('tape')
var split = require('./')
var join = split.join

test("sanity", function(t) {
  t.equal(typeof split, 'function', 'has split function')
  t.equal(typeof split.join, 'function', 'has join function')
  t.equal(split.split, split, 'split.split is alias for split')
  t.notEqual(split.split, split.join, 'split.join is not split.split')
  t.end()
})

test('empty object', function(t) {
  t.deepEqual(split({}), [], 'split({}) creates empty array')
  t.deepEqual(join([]), {}, 'join([]) creates empty object')
  t.end()
})

test('simple object', function(t) {
  var object = { key: 'value' }
  var array = [{
    key: 'key',
    value: 'value'
  }]
  t.deepEqual(split(object), array, 'split: Object -> Array')
  t.deepEqual(join(array), object, 'join: Array -> Object')
  t.end()
})

test('multi-key object', function(t) {
  var object = {
    apple: 'an apple',
    banana: 'a banana'
  }
  var array = [{
    key: 'apple',
    value: 'an apple'
  }, {
    key: 'banana',
    value: 'a banana'
  }]

  t.deepEqual(split(object), array, 'split: Object -> Array')
  t.deepEqual(join(array), object, 'join: Array -> Object')
  t.end()
})


