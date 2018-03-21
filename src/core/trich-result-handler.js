'use strict'
var resultHelper = require('./result-helper')
var trichResult = require('./trich-result')

module.exports = {
  testName: 'TRICH',
  handleResult: function (pantherResult, inputParams) {
    var result = []

    if(inputParams.accepted == false) {
      var trichResultUpdate = resultHelper.getBaseResultUpdate('tblTrichomonasTestOrder', 'ReportNo', inputParams.reportNo)
      var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParams.reportNo)

      if(pantherResult.OverallInterpretation == trichResult.negative.result) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.negative.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.negative.resultCode)

        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult.OverallInterpretation == trichResult.positive.result) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.positive.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.positive.resultCode)
        resultHelper.autoAccept(psoResultUpdate)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else if (pantherResult.OverallInterpretation == trichResult.invalid.result) {
        resultHelper.addField(trichResultUpdate, 'Result', trichResult.invalid.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', trichResult.invalid.resultCode)
        result.push(trichResultUpdate)
        result.push(psoResultUpdate)
      } else {
        console.log('Optimus prime does not handle this type of result.')
      }
    }
    return result
  }
}
