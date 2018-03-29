'use strict'
var resultHelper = require('./result-helper')
var hpvResult = require('./hpv-result')
const async = require('async')
var cmdSubmitter = require('ap-mysql').cmdSubmitter
var sqlBuildeer = require('ap-mysql').sqlBuilder

var self = module.exports = {
  testName: 'HPV',
  handleResult: function (pantherResult, callback) {
    var inputParams
    var statements
    var resultObj

    async.series([
      function(callback) {
        self.getInputParameters(pantherResult, function(err, inputParameters) {
          if(err) return callback(err)
          inputParams = inputParameters
          callback()
        })
      },
      function(callback) {
        self.buildUpdateObject(pantherResult, inputParams, function(err, results) {
          if(err) return callback(err)
            resultObj = results
            callback()
        })
      },
      function(callback) {
        self.updateDatabase(resultObj, function(err, result) {
          if(err) return callback(err)
          callback()
        })
      }
    ], function(err) {
      if(err) return callback(err)
      console.log(resultObj)
      callback(null, resultObj)
    })
  },
  getInputParameters: function (pantherResult, callback) {
    var inputParameters = {}
    var stmt = ['select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = 14 and OrderedOnId = \'', pantherResult.AliquotOrderId, '\''].join('')
    cmdSubmitter.submit(stmt, function(err, results) {
      if(err) return callback(err)
      if(results.length != 1) return callback('PanelSet not found.')
      inputParameters.reportNo = results[0].reportNo
      inputParameters.accepted = results[0].accepted
      callback(null, inputParameters)
    })
  },
  buildUpdateObject: function (pantherResult, inputParams, callback) {
    var result = []

    if(inputParams.accepted == false) {
      var hpvResultUpdate = resultHelper.getBaseResultUpdate('tblHPVTestOrder', 'ReportNo', inputParams.reportNo)
      var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParams.reportNo)

      if(pantherResult.OverallInterpretation == hpvResult.negative.result) {
        resultHelper.addField(hpvResultUpdate, 'Result', hpvResult.negative.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', hpvResult.negative.resultCode)

        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(hpvResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult.OverallInterpretation == hpvResult.positive.result) {
        resultHelper.addField(hpvResultUpdate, 'Result', hpvResult.positive.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', hpvResult.positive.resultCode)
        resultHelper.autoAccept(psoResultUpdate)
        result.push(hpvResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult.OverallInterpretation == hpvResult.invalid.result) {
        resultHelper.addField(hpvResultUpdate, 'Result', hpvResult.invalid.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', hpvResult.invalid.resultCode)
        result.push(hpvResultUpdate)
        result.push(psoResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result.')
      }
    }
    callback(null, result)
  },
  updateDatabase: function (updateObject, callback) {
    //convert update object to sql and send off to the sql server.
    var sql
    async.each(updateObject, function(tableObject, callback) {
      sqlBuilder.createStatement(tableObject, function(err, statement) {
        if(err) return callback(err)
        sql += statement
        callback()
      })
    }, function(err) {
      if(err) return callback(err)
      callback(null, sql)
    })
  }
}
