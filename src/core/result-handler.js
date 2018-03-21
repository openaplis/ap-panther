'use strict'

var grpc = require('grpc')
var path = require('path')
var _ = require('underscore')

var hpvResultHandler = require(path.join(__dirname, 'hpv-result-handler'))
var ngctResultHandler = require(path.join(__dirname, 'ngct-result-handler'))
var gthpvResultHandler = require(path.join(__dirname, 'gthpv-result-handler'))
var trichResultHandler = require(path.join(__dirname, 'trich-result-handler'))

const GATEWAY_PROTO_PATH = path.join(__dirname, '../../node_modules/ap-protobuf/src/core/gateway.proto')
const gateway_proto = grpc.load(GATEWAY_PROTO_PATH).gateway
const accessionOrderGateway = new gateway_proto.AccessionOrderGateway(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.credentials.createInsecure())

var self = module.exports = {
  handleResult: function (resultData, callback) {
    var masterAccessionNo = resultData.AliquotOrderId.split(".")[0]
    self.getAccessionOrder(resultData, function (err, ao) {
      var resultHandler = self.getHandler(resultData.TestName)
      resultHandler.handleResult(resultData, ao, function (err, ao) {
        if(err) return callback(err)
        //save the changes to the ao here.
        callback(null, 'all done.')
      })
    })
  },

  getHandler: function (testName) {
    var handlers = [hpvResultHandler, ngctResultHandler, gthpvResultHandler, trichResultHandler]
    var handler = _.find(handlers, function (h) { return h.testName == testName })
    if(handler == null) handler = handlerNotFound
    return handler
  },

  getAccessionOrderByAliquotOrderId: function (aliquotOrderId, callback) {
    var masterAccessionNo = resultData.AliquotOrderId.split(".")[0]
    accessionOrderGateway.getAccessionOrderByMasterAccessionNo( { masterAccessionNo: masterAccessionNo }, function (err, result) {
      if(err) return console.log(err)
      var ao = JSON.parse(result.json)
      callback(null, ao)
    })
  }
}

function handlerNotFound(requestBody, ao, callback) {
  callback("Optimus Prime does not handle results of type: " + requestBody.AliquotOrderId + " - " + requestBody.TestName)
}
