'use strict'
var resultHelper = require('./result-helper')
var hpv1618Result = require('./gthpv-result')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var self = module.exports = {
  testName: 'GT HPV',
  panelSetId: 62,
  getInputParameters: function (pantherResult, callback) {
    var inputParameters = {}
    var stmt = ['select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = ', self.panelSetId,
      ' and OrderedOnId = \'', pantherResult.AliquotOrderId, '\';'].join('')
      cmdSubmitter.submit(stmt, function(err, results) {
      if(err) return callback(err + '\n' + stmt)
      inputParameters.reportNo = results[0].reportNo
      inputParameters.accepted = results[0].accepted
      callback(null, inputParameters)
    })
  },
  buildUpdateObject: function (pantherResult, callback) {
    var result = []

    self.getInputParameters(pantherResult, function(err, inputParameters) {
      if(err) return callback(err)
      console.log('ip' + inputParameters)
      if(inputParameters.accepted == false) {
        var hpv1618ResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrderHPV1618', 'ReportNo', inputParameters.reportNo)
        var hpv16Result = pantherResult["HPV 16 Result"]
        var hpv18Result = pantherResult["HPV 18/45 Result"]

      if(hpv16Result == hpv1618Result.hpv16.negative.result) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.negative.resultCode)

        if(hpv18Result == hpv1618Result.hpv18.negative.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)

          var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)
          resultHelper.autoAccept(psoResultUpdate)
          resultHelper.autoFinal(psoResultUpdate)
          result.push(hpv1618ResultUpdate)
          result.push(psoResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.positive.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
          result.push(hpv1618ResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.invalid.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
          result.push(hpv1618ResultUpdate)
        } else {
          return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
      } else if(hpv16Result == hpv1618Result.hpv16.positive.result) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.positive.resultCode)
        if(hpv18Result == hpv1618Result.hpv18.negative.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)
          result.push(hpv1618ResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.positive.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
          result.push(hpv1618ResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.invalid.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
          result.push(hpv1618ResultUpdate)
        } else {
          return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
      } else if(hpv16Result == hpv1618Result.hpv16.invalid.result) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.invalid.resultCode)
        if(hpv18Result == hpv1618Result.hpv18.negative.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)
          result.push(hpv1618ResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.positive.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
          result.push(hpv1618ResultUpdate)
        } else if(hpv18Result == hpv1618Result.hpv18.invalid.result) {
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
          resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
          result.push(hpv1618ResultUpdate)
        } else {
          return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
      }
      callback(null, result)
    })
  }
}
