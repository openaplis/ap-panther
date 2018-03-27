'use strict'
var resultHelper = require('./result-helper')

module.exports = {
  createStatement: function(pantherResult) {
    var statement = ''
    var fields = ''
    if(pantherResult.type == 'update') {
      pantherResult.fields.foreach(function(element) {
        console.log(element)
      })
      console.log('fields = ' + fields)
      statement = [pantherResult.type, ' ', pantherResult.tableName, ' set ', fields, ';'].join('')
    }
    return statement
  }
}
