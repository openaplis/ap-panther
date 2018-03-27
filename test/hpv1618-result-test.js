const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultHPV1618 = require(path.join(__dirname, 'panther-result-hpv1618'))
const hpv1618ResultHandler = require('../src/core/hpv1618-result-handler')
const hpv1618Result = require('../src/core/hpv1618-result')

var inputParams = {
  reportNo: '18-99999',
  accepted: false,
  papIsFinal: true,
  specimenIsUnsat: true
}

describe('HPV1618 Tests', function () {
  it('Both Negative Test', function (done) {
    var updates = hpv1618ResultHandler.handleResult(pantherResultHPV1618.resultOne, inputParams)
    var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
    var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
    var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
    var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

    assert.equal(hpv1618Result.hpv16.negative.result, hpv16result.value)
    assert.equal(hpv1618Result.hpv16.negative.resultCode, hpv16resultCode.value)
    assert.equal(hpv1618Result.hpv18.negative.result, hpv18result.value)
    assert.equal(hpv1618Result.hpv18.negative.resultCode, hpv18resultCode.value)

    console.log(updates[1].fields)
    done()
  })

  it('16Positive 18Negative Test', function (done) {
    var updates = hpv1618ResultHandler.handleResult(pantherResultHPV1618.resultTwo, inputParams)
    var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
    var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
    var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
    var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

    assert.equal(hpv1618Result.hpv16.positive.result, hpv16result.value)
    assert.equal(hpv1618Result.hpv16.positive.resultCode, hpv16resultCode.value)
    assert.equal(hpv1618Result.hpv18.negative.result, hpv18result.value)
    assert.equal(hpv1618Result.hpv18.negative.resultCode, hpv18resultCode.value)
    done()
  })

  it('Invalid Test', function (done) {
    var updates = hpv1618ResultHandler.handleResult(pantherResultHPV1618.invalid, inputParams)
    var hpv16result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16Result')
    var hpv16resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV16ResultCode')
    var hpv18result = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18Result')
    var hpv18resultCode = resultHelper.getField(updates, 'tblPanelSetOrderHPV1618', 'HPV18ResultCode')

    assert.equal(hpv1618Result.hpv16.invalid.result, hpv16result.value)
    assert.equal(hpv1618Result.hpv16.invalid.resultCode, hpv16resultCode.value)
    assert.equal(hpv1618Result.hpv18.invalid.result, hpv18result.value)
    assert.equal(hpv1618Result.hpv18.invalid.resultCode, hpv18resultCode.value)
    done()
  })
})
