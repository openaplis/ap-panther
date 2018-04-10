'use strict'
var resultHelper = require('./result-helper')
var gthpvResult = require('./gthpv-result')
var cmdSubmitter = require('ap-mysql').cmdSubmitter

var self = module.exports = {
  testName: 'GT HPV',
  panelSetId: 62,
  getInputParametersStatement: function(pantherResult) {
    var sql = ['select pso.ReportNo, pso.Accepted, p.HoldForWHP, p.DistributeWHPOnly from tblPanelSetOrder ',
     'pso join tblAccessionOrder ao on pso.MasterAccessionNo = ao.MasterAccessionNo join tblPhysician p on ',
     'ao.PhysicianId = p.PhysicianId where PanelSetId = 62 and OrderedOnId = \'',
      pantherResult.AliquotOrderId, '\'; select ReportNo, Final from tblPanelSetOrder where ',
     'PanelSetId = 116 and MasterAccessionNo = (select MasterAccessionNo from tblPanelSetOrder where ',
     'PanelSetId = 62 and OrderedOnId = \'', pantherResult.AliquotOrderId, '\');'].join('')
     return sql
  },
  buildUpdateObject: function (pantherResult, inputParameters, callback) {
    var result = []

    if(inputParameters.accepted == false) {
      var hpv1618ResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrderHPV1618', 'ReportNo', inputParameters.reportNo)
      var hpv16Result = pantherResult["HPV 16 Result"]
      var hpv18Result = pantherResult["HPV 18/45 Result"]

    if(hpv16Result == gthpvResult.hpv16.negative.pantherResult) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', gthpvResult.hpv16.negative.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', gthpvResult.hpv16.negative.resultCode)

      if(hpv18Result == gthpvResult.hpv18.negative.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.negative.resultCode)

        var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)
        resultHelper.addField(psoResultUpdate, 'HoldDistribution', inputParameters.holdDistribution)

        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(hpv1618ResultUpdate)
        result.push(psoResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.positive.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.invalid.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
      }
    } else if(hpv16Result == gthpvResult.hpv16.positive.pantherResult) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', gthpvResult.hpv16.positive.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', gthpvResult.hpv16.positive.resultCode)
      if(hpv18Result == gthpvResult.hpv18.negative.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.negative.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.positive.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.invalid.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
      }
    } else if(hpv16Result == gthpvResult.hpv16.invalid.pantherResult) {
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16Result', gthpvResult.hpv16.invalid.result)
      resultHelper.addField(hpv1618ResultUpdate, 'HPV16ResultCode', gthpvResult.hpv16.invalid.resultCode)
      if(hpv18Result == gthpvResult.hpv18.negative.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.negative.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.negative.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.positive.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.positive.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.positive.resultCode)
        result.push(hpv1618ResultUpdate)
      } else if(hpv18Result == gthpvResult.hpv18.invalid.pantherResult) {
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18Result', gthpvResult.hpv18.invalid.result)
        resultHelper.addField(hpv1618ResultUpdate, 'HPV18ResultCode', gthpvResult.hpv18.invalid.resultCode)
        result.push(hpv1618ResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
      }
    } else {
      return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
      }
    }
    callback(null, result)
  }
}
