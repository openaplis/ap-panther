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
      getUpdateStatements //,
      //updateDatabase
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
  var inputParameters = {}
  var stmt = ['select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = ', handler.panelSetId,
    ' and OrderedOnId = \'', resultData.AliquotOrderId, '\';'].join('')
    cmdSubmitter.submit(stmt, function(err, results) {
    if(err) return callback(err + '\n' + stmt)
    if(results.length == 0) return callback('PanelSet not found.')
    if(results.length > 1) return callback('Too many PanelSets found.')
    if(results.accepted == 1) return callback('PanelSet already accepted - ' + results[0].reportNo)
    inputParameters.reportNo = results[0].reportNo
    inputParameters.accepted = results[0].accepted
    callback(null, resultData, handler, inputParameters)
  })
}

function buildUpdateObject (resultData, handler, inputParameters, callback) {
  handler.buildUpdateObject(resultData, inputParameters, function(err, updateObject) {
    if(err) return callback(err)
    callback(null, updateObject)
  })
}

function getUpdateStatements(updateObject, callback) {
  var sql = ''
  async.each(updateObject, function(tableObject, callback) {
    sqlHelper.createUpdateStatement(tableObject, function(err, statement) {
      if(err) return callback(err)
      sql += statement
      callback()
    })
  }, function(err) {
    if(err) return callback(err)
    callback(null, sql)
  })

}

function updateDatabase(updateStatements, callback) {
  sqlHelper.cmdSubmitter.submit(updateStatements, function(err, results) {
    if(err) return callback(err + '\n' + updateStatements)
    callback()
  })
}
