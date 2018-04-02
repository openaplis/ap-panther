const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultGTHPV = require(path.join(__dirname, 'panther-result-gthpv'))
const gthpvResultHandler = require('../src/core/gthpv-result-handler')
const gthpvResult = require('../src/core/gthpv-result')

describe('HPV1618 Tests', function () {
  it('Both Negative Test', function (done) {
    gthpvResultHandler.buildUpdateObject(pantherResultGTHPV.resultOne, function(err, updates) {
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
    gthpvResultHandler.buildUpdateObject(pantherResultGTHPV.resultTwo, function(err, updates) {
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
    gthpvResultHandler.buildUpdateObject(pantherResultGTHPV.invalid, function(err, updates) {
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
})
