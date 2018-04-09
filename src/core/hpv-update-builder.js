'use strict'
var resultHelper = require('./result-helper')
var hpvResult = require('./hpv-result')

var self = module.exports = {
  testName: 'HPV',
  panelSetId: 14,
  buildUpdateObject: function (pantherResult, inputParameters, callback) {
    var result = []

    if(inputParameters.accepted == false) {
      var hpvResultUpdate = resultHelper.getBaseResultUpdate('tblHPVTestOrder', 'ReportNo', inputParameters.reportNo)
      var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)

      if(pantherResult.OverallInterpretation == hpvResult.negative.result) {
        resultHelper.addField(hpvResultUpdate, 'Result', hpvResult.negative.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', hpvResult.negative.resultCode)

        var holdValue = 0
        if(inputParameters.hasWHP == true && inputParameters.whpIsFinal == false &&
           (inputParameters.holdForWHP == true || inputParameters.distributeWHPOnly == true)) {
             holdValue = 1
        }
        resultHelper.addField(psoResultUpdate, 'HoldDistribution', holdValue)

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
  }
}
