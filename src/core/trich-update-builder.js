'use strict'
var resultHelper = require('./result-helper')
var trichResult = require('./trich-result')

var self = module.exports = {
  testName: 'TRICH',
  getInputParametersStatement: function (pantherResult) {
    var stmt = ['select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = 61 and OrderedOnId = \'',
      pantherResult.AliquotOrderId, '\';'].join('')
      return stmt
  },

  buildUpdateObject: function (pantherResult, inputParameters, callback) {
    var result = []

    if(inputParameters.accepted == false) {
      var trichResultUpdate = resultHelper.getBaseResultUpdate('tblTrichomonasTestOrder', 'ReportNo', inputParameters.reportNo)
      var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)

      if(pantherResult["TRICH Result"] == trichResult.negative.pantherResult) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.negative.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.negative.resultCode)

        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult["TRICH Result"] == trichResult.positive.pantherResult) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.positive.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.positive.resultCode)
        resultHelper.autoAccept(psoResultUpdate)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult["TRICH Result"] == trichResult.invalid.pantherResult) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.invalid.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.invalid.resultCode)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
      }
    }
    callback(null, result)
  }
}
