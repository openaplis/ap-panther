const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultTrich = require(path.join(__dirname, 'panther-result-trich'))
const trichUpdateBuilder = require('../src/core/trich-update-builder')
const trichResult = require('../src/core/trich-result')

var inputParams = {
  "reportNo": "17-999999",
  "accepted": 0,
  "holdForWHP": 1,
  "distributeWHPOnly": 0,
  "hasWHP": 1,
  "whpIsFinal": 0
}

describe('TRICH Tests', function () {
  it('Negative Test', function (done) {
    trichUpdateBuilder.buildUpdateObject(pantherResultTrich.negative, inputParams, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblTrichomonasTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')
        var holdDist = resultHelper.getField(updates, 'tblPanelSetOrder', 'HoldDistribution')

        assert.equal(trichResult.negative.result, result.value)
        assert.equal(trichResult.negative.resultCode, resultCode.value)
        assert.equal(1, holdDist.value)
      }
      done()
    })
  })

  it('Positive Test', function (done) {
    trichUpdateBuilder.buildUpdateObject(pantherResultTrich.positive, inputParams, function(err, updates) {
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
    trichUpdateBuilder.buildUpdateObject(pantherResultTrich.invalid, inputParams, function(err, updates) {
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

  it('Already Accepted Test', function (done) {
    var inputParamsAccepted = {
      "reportNo": "17-999999",
      "accepted": true
    }

    trichUpdateBuilder.buildUpdateObject(pantherResultTrich.negative, inputParamsAccepted, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        assert.equal(updates.length, 0)
      }
      done()
    })
  })
})
