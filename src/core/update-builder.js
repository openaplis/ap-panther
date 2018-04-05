'use strict'

const async = require('async')
//var grpc = require('grpc')
var path = require('path')
var _ = require('underscore')
var cmdSubmitter = require('ap-mysql').cmdSubmitter
var sqlHelper = require('ap-mysql').sqlHelper

var hpvUpdateBuilder = require(path.join(__dirname, 'hpv-update-builder'))
var ngctUpdateBuilder = require(path.join(__dirname, 'ngct-update-builder'))
var gthpvUpdateBuilder = require(path.join(__dirname, 'gthpv-update-builder'))
var trichUpdateBuilder = require(path.join(__dirname, 'trich-update-builder'))

var self = module.exports = {
  handleResult: function (resultData, callback) {
    async.waterfall([
      async.apply(getUpdateBuilder, resultData),
      buildUpdateObject,
      updateDatabase
    ],function (err, result) {
      if(err) return callback(err)
      callback(null, 'all done')
    })
  }
}

function getUpdateBuilder (resultData, callback) {
  var updateBuilders = [hpvUpdateBuilder, ngctUpdateBuilder, gthpvUpdateBuilder, trichUpdateBuilder]
  var updateBuilder = _.find(updateBuilders, function (h) { return h.testName == resultData.TestName })
  var nullUpdateBuilderResult = 'Optimus Prime does not handle results of type: ' + resultData.AliquotOrderId + ' - ' + resultData.TestName
  if(updateBuilder == null) return callback(nullUpdateBuilderResult)
  callback(null, resultData, updateBuilder)
}

function buildUpdateObject (resultData, updateBuilder, callback) {
  updateBuilder.buildUpdateObject(resultData, function(err, updateObject) {
    if(err) return callback(err)
    callback(null, updateObject)
  })
}

function updateDatabase(updateObject, callback) {
  if(updateObject.length == 0) { return callback() }
  var sql = sqlHelper.createUpdateStatement(updateObject)
  //cmdSubmitter.submit(sql, function(err, results) {
    //if(err) return callback(err + '\n' + sql)
    callback()
  //})
}
