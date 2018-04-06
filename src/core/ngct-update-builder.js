'use strict'
var resultHelper = require('./result-helper')
var ngctResult = require('./ngct-result')

var self = module.exports = {
  testName: 'CT/GC',
  getInputParametersStatement: function (pantherResult, callback) {
    var stmt = ['select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = 3 and OrderedOnId = \'',
      pantherResult.AliquotOrderId, '\';'].join('')
      return stmt
  },

  buildUpdateObject: function (pantherResult, inputParameters, callback) {
    var result = []

    if(inputParameters.accepted == false) {
      var ngctResultUpdate = resultHelper.getBaseResultUpdate('tblNGCTTestOrder', 'ReportNo', inputParameters.reportNo)
      var ngResult = pantherResult.GCResult
      var ctResult = pantherResult.CTResult

    if(ngResult == ngctResult.ng.negative.pantherResult) {
      resultHelper.addField(ngctResultUpdate, 'NeisseriaGonorrhoeaeResult', ngctResult.ng.negative.result)
      resultHelper.addField(ngctResultUpdate, 'NGResultCode', ngctResult.ng.negative.resultCode)

      if(ctResult == ngctResult.ct.negative.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.negative.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.negative.resultCode)

        var psoResultUpdate = resultHelper.getBaseResultUpdate('tblPanelSetOrder', 'ReportNo', inputParameters.reportNo)
        resultHelper.autoAccept(psoResultUpdate)
        resultHelper.autoFinal(psoResultUpdate)
        result.push(ngctResultUpdate)
        result.push(psoResultUpdate)
      } else if(ctResult == ngctResult.ct.positive.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.positive.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.positive.resultCode)
        result.push(ngctResultUpdate)
      } else if(ctResult == ngctResult.ct.invalid.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.invalid.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.invalid.resultCode)
        result.push(ngctResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
    } else if(ngResult == ngctResult.ng.positive.pantherResult) {
      resultHelper.addField(ngctResultUpdate, 'NeisseriaGonorrhoeaeResult', ngctResult.ng.positive.result)
      resultHelper.addField(ngctResultUpdate, 'NGResultCode', ngctResult.ng.positive.resultCode)
      if(ctResult == ngctResult.ct.negative.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.negative.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.negative.resultCode)
        result.push(ngctResultUpdate)
      } else if(ctResult == ngctResult.ct.positive.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.positive.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.positive.resultCode)
        result.push(ngctResultUpdate)
      } else if(ctResult == ngctResult.ct.invalid.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.invalid.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.invalid.resultCode)
        result.push(ngctResultUpdate)
      } else {
        return callback('Optimus prime does not handle this type of result. - ' + inputParameters.reportNo)
        }
    } else if(ngResult == ngctResult.ng.invalid.pantherResult) {
      resultHelper.addField(ngctResultUpdate, 'NeisseriaGonorrhoeaeResult', ngctResult.ng.invalid.result)
      resultHelper.addField(ngctResultUpdate, 'NGResultCode', ngctResult.ng.invalid.resultCode)
      if(ctResult == ngctResult.ct.negative.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.negative.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.negative.resultCode)
        result.push(ngctResultUpdate)
      } else if(ctResult == ngctResult.ct.positive.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.positive.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.positive.resultCode)
        result.push(ngctResultUpdate)
      } else if(ctResult == ngctResult.ct.invalid.pantherResult) {
        resultHelper.addField(ngctResultUpdate, 'ChlamydiaTrachomatisResult', ngctResult.ct.invalid.result)
        resultHelper.addField(ngctResultUpdate, 'CTResultCode', ngctResult.ct.invalid.resultCode)
        result.push(ngctResultUpdate)
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
