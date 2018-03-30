'use strict'

const async = require('async')
//var grpc = require('grpc')
var path = require('path')
var _ = require('underscore')
var cmdSubmitter = require('ap-mysql').cmdSubmitter
var sqlHelper = require('ap-mysql').sqlHelper

var hpvResultHandler = require(path.join(__dirname, 'hpv-result-handler'))
var ngctResultHandler = require(path.join(__dirname, 'ngct-result-handler'))
var gthpvResultHandler = require(path.join(__dirname, 'hpv1618-result-handler'))
var trichResultHandler = require(path.join(__dirname, 'trich-result-handler'))

var self = module.exports = {
  handleResult: function (resultData, callback) {
    async.waterfall([
      async.apply(getHandler, resultData),
      getInputParameters,
      buildUpdateObject,
      updateDatabase
    ],function (err, result) {
      if(err) return callback(err)
      callback(null, 'all done')
    })
  }
}

function getHandler (resultData, callback) {
  var handlers = [hpvResultHandler, ngctResultHandler, gthpvResultHandler, trichResultHandler]
  var handler = _.find(handlers, function (h) { return h.testName == resultData.TestName })
  var nullHandlerResult = 'Optimus Prime does not handle results of type: ' + resultData.AliquotOrderId + ' - ' + resultData.TestName
  if(handler == null) return callback(nullHandlerResult)
  callback(null, resultData, handler)
}

function getInputParameters (resultData, handler, callback) {
  handler.getInputParameters(resultData, function(err, inputParameters) {
    if(err) return callback(err)
    console.log(inputParameters)
    callback(null, resultData, handler, inputParameters)
  })
}

function buildUpdateObject (resultData, handler, inputParameters, callback) {
  handler.buildUpdateObject(resultData, inputParameters, function(err, updateObject) {
    if(err) return callback(err)
    callback(null, updateObject)
  })
}

function updateDatabase(updateObject, callback) {
  var sql = sqlHelper.createUpdateStatement(updateObject)
  //cmdSubmitter.submit(sql, function(err, results) {
    //if(err) return callback(err + '\n' + sql)
    callback()
  //})
}
