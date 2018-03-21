const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultTrich = require(path.join(__dirname, 'panther-result-trich'))
const trichResultHandler = require('../src/core/trich-result-handler')
const trichResult = require('../src/core/trich-result')

var inputParams = {
  reportNo: '18-99999',
  accepted: false,
  papIsFinal: true,
  specimenIsUnsat: true
}

describe('HPV Tests', function () {
  it('Negative Test', function (done) {
    var updates = trichResultHandler.handleResult(pantherResultTrich.negative, inputParams)
    var result = resultHelper.getField(updates, 'tblTrichTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')
    var comment = resultHelper.getField(updates, 'tblTrichTestOrder', 'Comment')

    assert.equal(trichResult.negative.result, result.value)
    assert.equal(trichResult.negative.resultCode, resultCode.value)
    assert.equal(trichResult.unsatSpecimenComment, comment.value)

    done()
  })

  it('Positive Test', function (done) {
    var updates = trichResultHandler.handleResult(pantherResultTrich.positive, inputParams)
    var result = resultHelper.getField(updates, 'tblTrichTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

    assert.equal(trichResult.positive.result, result.value)
    assert.equal(trichResult.positive.resultCode, resultCode.value)
    done()
  })

  it('Invalid Test', function (done) {
    var updates = trichResultHandler.handleResult(pantherResultTrich.invalid, inputParams)
    var result = resultHelper.getField(updates, 'tblTrichTestOrder', 'Result')
    var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

    assert.equal(trichResult.invalid.result, result.value)
    assert.equal(trichResult.invalid.resultCode, resultCode.value)
    done()
  })
})
