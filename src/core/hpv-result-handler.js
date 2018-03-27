'use strict'
var resultHelper = require('./result-helper')
var hpvResult = require('./hpv-result')

module.exports = {
  testName: 'HPV',
  handleResult: function (pantherResult) {
    //compose things here
  },
  getInputParameters: function (pantherResult) {
    //Go get the data necessary from mysql server, only bring what is necessary
  },
  buildUpdateObject: function (pantherResult, inputParams) {
    var result = []

    if(inputParams.accepted == false) {
      var hpvResultUpdate = resultHelper.getBaseResultUpdate('tblHPVTestOrder', 'ReportNo', inputParams.reportNo)
      var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParams.reportNo)

      if(pantherResult.OverallInterpretation == hpvResult.negative.result) {
        resultHelper.addField(hpvResultUpdate, 'Result', hpvResult.negative.result)
        resultHelper.addField(psoResultUpdate, 'ResultCode', hpvResult.negative.resultCode)

        if(inputParams.specimenIsUnsat == true) {
          if(inputParams.papIsFinal == true) {
            resultHelper.addField(hpvResultUpdate, 'Comment', hpvResult.unsatSpecimenComment)
          }
        }

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
        console.log('Optimus prime does not handle this type of result.')
      }
    }
    return result
  },
  updateDatabase: function (updateObject) {
    //convert update object to sql and send off to the sql server.
  }
}
