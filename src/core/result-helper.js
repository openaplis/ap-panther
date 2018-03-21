'use strict'
var dateformat = require('dateformat')

module.exports = {
  getField: function (updates, tableName, fieldName) {
    var update = updates.find(function (item) { return item.tableName == tableName })
    var result = update.fields.find(function (item) { return item.name == fieldName })
    return result
  },
  addField: function (object, fieldName, fieldValue) {
    object.fields.push({ name: fieldName, value: fieldValue })
  },
  getBaseResultUpdate: function (tableName, primaryKey, primaryKeyValue) {
    var result = {
        type: 'update',
        tableName: tableName,
        primaryKey: primaryKey,
        primaryKeyValue: primaryKeyValue,
        fields: []
      }
      return result
  },
  autoAccept: function (result) {
    var currentDate = dateformat(Date.now(), "yyyy-mm-dd")
    var currentTime = dateformat(Date.now(), "yyyy-mm-dd hh:MM")

    var accepted = { name: 'Accepted', value: 1 }
    var acceptedBy = { name: 'AcceptedBy', value: 'AUTOVER TESTING' }
    var acceptedById = { name: 'AcceptedById', value: 5134 }
    var acceptedDate = { name: 'AcceptedDate', value: currentDate }
    var acceptedTime = { name: 'AcceptedTime', value: currentTime }
    result.fields.push(accepted)
    result.fields.push(acceptedBy)
    result.fields.push(acceptedById)
    result.fields.push(acceptedDate)
    result.fields.push(acceptedTime)
  },

  autoFinal: function (result) {
    var currentDate = dateformat(Date.now(), "yyyy-mm-dd")
    var currentTime = dateformat(Date.now(), "yyyy-mm-dd hh:MM")

    var final = { name: 'Final', value: 1 }
    var signature = { name: 'Signature', value: 'AUTOVER TESTING' }
    var finaledById = { name: 'FinaledById', value: 5134 }
    var finalDate = { name: 'FinalDate', value: currentDate }
    var finalTime = { name: 'FinalTime', value: currentTime }
    result.fields.push(final)
    result.fields.push(signature)
    result.fields.push(finaledById)
    result.fields.push(finalDate)
    result.fields.push(finalTime)
    return result
  }
}
