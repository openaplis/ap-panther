const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultHPV = require(path.join(__dirname, 'panther-result-hpv'))
const hpvResultHandler = require('../src/core/hpv-result-handler')
const hpvResult = require('../src/core/hpv-result')

var inputParams = {
  reportNo: '18-99999',
  accepted: false,
  papIsFinal: true,
  specimenIsUnsat: true
}

describe('HPV Tests', function () {
  it('Negative Test', function (done) {
    var updates = hpvResultHandler.handleResult(pantherResultHPV.negative, inputParams)
    var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')
    var comment = resultHelper.getField(updates, 'tblHPVTestOrder', 'Comment')

    assert.equal(hpvResult.negative.result, result.value)
    assert.equal(hpvResult.negative.resultCode, resultCode.value)
    assert.equal(hpvResult.unsatSpecimenComment, comment.value)

    console.log(updates[1].fields)
    done()
  })

  it('Positive Test', function (done) {
    var updates = hpvResultHandler.handleResult(pantherResultHPV.positive, inputParams)
    var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

    assert.equal(hpvResult.positive.result, result.value)
    assert.equal(hpvResult.positive.resultCode, resultCode.value)
    done()
  })

  it('Invalid Test', function (done) {
    var updates = hpvResultHandler.handleResult(pantherResultHPV.invalid, inputParams)
    var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

    assert.equal(hpvResult.invalid.result, result.value)
    assert.equal(hpvResult.invalid.resultCode, resultCode.value)
    done()
  })
})
