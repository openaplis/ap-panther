const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultHPV = require(path.join(__dirname, 'panther-result-hpv'))
const hpvUpdateBuilder = require('../src/core/hpv-update-builder')
const hpvResult = require('../src/core/hpv-result')

var inputParams = {
  "reportNo": "17-999999",
  "accepted": false
}

describe('HPV Tests', function () {
  it('GetInputParametersStatement Test', function(done) {
    var stmt = hpvUpdateBuilder.getInputParametersStatement(pantherResultHPV.negative)
      assert.equal(stmt, 'select ReportNo, Accepted from tblPanelSetOrder where PanelSetId = 14 and OrderedOnId = \'17-999999.1.1\';')
      done()
  })

  it('Negative Test', function (done) {
    hpvUpdateBuilder.buildUpdateObject(pantherResultHPV.negative, inputParams, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(hpvResult.negative.result, result.value)
        assert.equal(hpvResult.negative.resultCode, resultCode.value)
      }
      done()
    })
  })

  it('Already Accepted Test', function (done) {
    var inputParamsAccepted = {
      "reportNo": "17-999999",
      "accepted": true
    }

    hpvUpdateBuilder.buildUpdateObject(pantherResultHPV.negative, inputParamsAccepted, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        assert.equal(updates.length, 0)
      }
      done()
    })
  })

  it('Positive Test', function (done) {
    hpvUpdateBuilder.buildUpdateObject(pantherResultHPV.positive, inputParams, function(err, updates) {
      if(err) {
        console.log('Error - ' + err)
        assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(hpvResult.positive.result, result.value)
        assert.equal(hpvResult.positive.resultCode, resultCode.value)
      }
      done()
    })
  })

  it('Invalid Test', function (done) {
    hpvUpdateBuilder.buildUpdateObject(pantherResultHPV.invalid, inputParams, function(err, updates) {
      if(err) {
        console.log('Error - ' + err)
        assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(hpvResult.invalid.result, result.value)
        assert.equal(hpvResult.invalid.resultCode, resultCode.value)
      }
      done()
    })
  })
})
