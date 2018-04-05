'use strict'
var resultHelper = require('./result-helper')
var hpvResult = require('./hpv-result')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var self = module.exports = {
  testName: 'HPV',
  panelSetId: 14,
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
      if(inputParameters.accepted == false) {
        var hpvResultUpdate = resultHelper.getBaseResultUpdate('tblHPVTestOrder', 'ReportNo', inputParameters.reportNo)
        var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)

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
          return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
      }
      callback(null, result)
    })
  }
}