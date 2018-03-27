'use strict'
var resultHelper = require('./result-helper')

module.exports = {
  createStatement: function(pantherResult) {
    var statement = ''
    if(pantherResult.type == 'update') {
      console.log('panther fields = ' + pantherResult.fields)
      var fields = updateFieldsWithValues(pantherResult.fields)
      console.log('fields = ' + fields)
      statement = [pantherResult.type, ' ', pantherResult.tableName, ' set ', fields, ';'].join('')
    }
    return statement
  }
}

function updateFieldsWithValues(fields) {
  var result = ''
  for(var obj in fields) {
    console.log('obj' + obj)
    for(var name in obj) {
      result += name
      result += ' = \''
  console.log(result)
      result += fields.name
      result += '\','
      console.log(result)
    }
  }
  result = result.slice(0, -1)
  console.log(result)
  return result
}
