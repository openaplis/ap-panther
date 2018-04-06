const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultGTHPV = require(path.join(__dirname, 'panther-result-gthpv'))
const gthpvUpdateBuilder = require('../src/core/gthpv-update-builder')
const gthpvResult = require('../src/core/gthpv-result')

var inputParams = {
  "reportNo": "17-999999",
  "accepted": false
}

describe('GT HPV Tests', function () {
  it('GetInputParametersStatement Test', function(done) {
    var stmt = gthpvUpdateBuilder.getInputParametersStatement(pantherResultGTHPV.resultOne)
      assert.equal(stmt, 'select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = 62 and OrderedOnId = \'17-999999.1.1\';')
      done()
  })

  it('Both Negative Test', function (done) {
    gthpvUpdateBuilder.buildUpdateObject(pantherResultGTHPV.resultOne, inputParams, function(err, updates) {
      if(err) assert.equal(err, '')
      var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
      var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
      var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
      var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

      assert.equal(gthpvResult.hpv16.negative.result, hpv16result.value)
      assert.equal(gthpvResult.hpv16.negative.resultCode, hpv16resultCode.value)
      assert.equal(gthpvResult.hpv18.negative.result, hpv18result.value)
      assert.equal(gthpvResult.hpv18.negative.resultCode, hpv18resultCode.value)
    })
    done()
  })

  it('16Positive 18Negative Test', function (done) {
    gthpvUpdateBuilder.buildUpdateObject(pantherResultGTHPV.resultTwo, inputParams, function(err, updates) {
      if(err) assert.equal(err, '')
      var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
      var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
      var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
      var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

      assert.equal(gthpvResult.hpv16.positive.result, hpv16result.value)
      assert.equal(gthpvResult.hpv16.positive.resultCode, hpv16resultCode.value)
      assert.equal(gthpvResult.hpv18.negative.result, hpv18result.value)
      assert.equal(gthpvResult.hpv18.negative.resultCode, hpv18resultCode.value)
    })
    done()
  })

  it('Invalid Test', function (done) {
    gthpvUpdateBuilder.buildUpdateObject(pantherResultGTHPV.invalid, inputParams, function(err, updates) {
      if(err) assert.equal(err, '')
      var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
      var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
      var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
      var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

      assert.equal(gthpvResult.hpv16.invalid.result, hpv16result.value)
      assert.equal(gthpvResult.hpv16.invalid.resultCode, hpv16resultCode.value)
      assert.equal(gthpvResult.hpv18.invalid.result, hpv18result.value)
      assert.equal(gthpvResult.hpv18.invalid.resultCode, hpv18resultCode.value)
    })
    done()
  })

  it('Already Accepted Test', function (done) {
    var inputParamsAccepted = {
      "reportNo": "17-999999",
      "accepted": true
    }

    gthpvUpdateBuilder.buildUpdateObject(pantherResultGTHPV.invalid, inputParamsAccepted, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        assert.equal(updates.length, 0)
      }
      done()
    })
  })
})
