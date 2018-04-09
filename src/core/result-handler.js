'use strict'

const async = require('async')
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
      async.apply(self.getUpdateBuilder, resultData),
      self.getInputParameters,
      self.buildUpdateObject,
      self.updateDatabase
    ],function (err, result) {
      if(err) return callback(err)
      callback(null, 'all done')
    })
  },

  getUpdateBuilder: function (resultData, callback) {
    var updateBuilders = [hpvUpdateBuilder, ngctUpdateBuilder, gthpvUpdateBuilder, trichUpdateBuilder]
    var updateBuilder = _.find(updateBuilders, function (h) { return h.testName == resultData.TestName })
    var nullUpdateBuilderResult = 'Optimus Prime does not handle results of type: ' + resultData.AliquotOrderId + ' - ' + resultData.TestName
    if(updateBuilder == null) return callback(nullUpdateBuilderResult)
    callback(null, resultData, updateBuilder)
  },

  getInputParameters: function (resultData, updateBuilder, callback) {
    var inputParametersStatement = ['select pso.ReportNo, pso.Accepted, p.HoldForWHP, p.DistributeWHPOnly ',
      'from tblPanelSetOrder pso join tblAccessionOrder ao on pso.MasterAccessionNo = ao.MasterAccessionNo ',
      'join tblPhysician p on ao.PhysicianId = p.PhysicianId where PanelSetId = ', updateBuilder.panelSetId,
      ' and OrderedOnId = \'', resultData.AliquotOrderId, '\'; select ReportNo, Final from tblPanelSetOrder ',
      'where PanelSetId = 116 and MasterAccessionNo = (select MasterAccessionNo from tblPanelSetOrder where ',
      'PanelSetId = ', updateBuilder.panelSetId, ' and OrderedOnId = \'', resultData.AliquotOrderId, '\');'].join('')
    var inputParameters = {}
    cmdSubmitter.submit(inputParametersStatement, function(err, results) {
      if(err) return callback(err)
      inputParameters.reportNo = results[0].reportNo
      inputParameters.accepted = results[0].accepted
      inputParameters.holdForWHP = results[0].holdForWHP
      inputParameters.distributeWHPOnly = results[0].distributeWHPOnly
      if(results[1].reportNo == null) { inputParameters.hasWHP = 0
      }else{
        inputParameters.hasWHP = 1
      }
      if(results[1].final == null) { inputParameters.whpIsFinal = 0
      }else{
        inputParameters.whpIsFinal = results[1].final
      }

      callback(null, resultData, updateBuilder, inputParameters)
    })
  },

  buildUpdateObject: function (resultData, updateBuilder, inputParameters, callback) {
    updateBuilder.buildUpdateObject(resultData, inputParameters, function(err, updateObject) {
      if(err) return callback(err)
      callback(null, updateObject)
    })
  },

  updateDatabase: function (updateObject, callback) {
    if(updateObject.length == 0) { return callback() }
    var sql = sqlHelper.createUpdateStatement(updateObject)
    //cmdSubmitter.submit(sql, function(err, results) {
      //if(err) return callback(err + '\n' + sql)
      callback(null, sql)
    //})
  }
}
