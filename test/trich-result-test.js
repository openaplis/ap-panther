const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultTrich = require(path.join(__dirname, 'panther-result-trich'))
const trichResultHandler = require('../src/core/trich-result-handler')
const trichResult = require('../src/core/trich-result')

describe('TRICH Tests', function () {
  it('Negative Test', function (done) {
    trichResultHandler.buildUpdateObject(pantherResultTrich.negative, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblTrichomonasTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(trichResult.negative.result, result.value)
        assert.equal(trichResult.negative.resultCode, resultCode.value)
      }
      done()
    })
  })

  it('Positive Test', function (done) {
    trichResultHandler.buildUpdateObject(pantherResultTrich.positive, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblTrichomonasTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(trichResult.positive.result, result.value)
        assert.equal(trichResult.positive.resultCode, resultCode.value)
      }
      done()
    })
  })

  it('Invalid Test', function (done) {
    trichResultHandler.buildUpdateObject(pantherResultTrich.invalid, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblTrichomonasTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(trichResult.invalid.result, result.value)
        assert.equal(trichResult.invalid.resultCode, resultCode.value)
      }
      done()
    })
  })
})
