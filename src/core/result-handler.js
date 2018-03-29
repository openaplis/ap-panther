'use strict'

const async = require('async')
//var grpc = require('grpc')
var path = require('path')
var _ = require('underscore')

var hpvResultHandler = require(path.join(__dirname, 'hpv-result-handler'))
var ngctResultHandler = require(path.join(__dirname, 'ngct-result-handler'))
var gthpvResultHandler = require(path.join(__dirname, 'hpv1618-result-handler'))
var trichResultHandler = require(path.join(__dirname, 'trich-result-handler'))

var self = module.exports = {
  handleResult: function (resultData, callback) {
    var resultHandler

    async.series([
      function(callback) {
        self.getHandler(resultData.TestName, function(err, handler) {
          if(err) return callback(err)
          resultHandler = handler
          callback()
        })
      },
      function(callback) {
        resultHandler.handleResult(resultData, function (err, result) {
        if(err) return callback(err)
          callback()
        })
      }
    ], function(err) {
      if(err) return callback(err)
      callback(null, 'all done.')
    })
  },

  getHandler: function (testName, callback) {
    var handlers = [hpvResultHandler, ngctResultHandler, gthpvResultHandler, trichResultHandler]
    var handler = _.find(handlers, function (h) { return h.testName == testName })
    if(handler == null) return callback("Optimus Prime does not handle results of type: " + requestBody.AliquotOrderId + " - " + requestBody.TestName)
    callback(null, handler)
  }
}
