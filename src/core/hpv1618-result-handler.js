'use strict'
var resultHelper = require('./result-helper')
var hpv1618Result = require('./hpv1618-result')

module.exports = {
  testName: '"GT HPV',
  handleResult: function (pantherResult, inputParams) {
    var result = []

    if(inputParams.accepted == false) {
      var hpv1618ResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrderHPV1618', 'ReportNo', inputParams.reportNo)
      var hpv16Result = pantherResult["HPV 16 Result"].toUpperCase()
      var hpv18Result = pantherResult["HPV 18/45 Result"].toUpperCase()

    if(hpv16Result == hpv1618Result.hpv16.negative.result.toUpperCase()) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.negative.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.negative.resultCode)

      if(hpv18Result == hpv1618Result.hpv18.negative.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)

        var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParams.reportNo)
        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(hpv1618ResultUpdate)
        result.push(psoResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.positive.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.invalid.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        console.log('Optimus prime does not handle this type of result.')
      }
    } else if(hpv16Result == hpv1618Result.hpv16.positive.result.toUpperCase()) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.positive.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.positive.resultCode)
      if(hpv18Result == hpv1618Result.hpv18.negative.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.positive.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.invalid.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        console.log('Optimus prime does not handle this type of result.')
      }
    } else if(hpv16Result == hpv1618Result.hpv16.invalid.result.toUpperCase()) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', hpv1618Result.hpv16.invalid.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', hpv1618Result.hpv16.invalid.resultCode)
      if(hpv18Result == hpv1618Result.hpv18.negative.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.negative.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.positive.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == hpv1618Result.hpv18.invalid.result.toUpperCase()) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', hpv1618Result.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', hpv1618Result.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        console.log('Optimus prime does not handle this type of result.')
      }
    } else {
        console.log('Optimus prime does not handle this type of result.')
      }
    }
    return result
  }
}
