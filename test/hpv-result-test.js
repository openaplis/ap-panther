const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultHPV = require(path.join(__dirname, 'panther-result-hpv'))
const hpvResultHandler = require('../src/core/hpv-result-handler')
const hpvResult = require('../src/core/hpv-result')

var inputParams = {
  reportNo: '18-99999',
  accepted: false
}

describe('HPV Tests', function () {
  it('GetInputParameters Test', function(done) {
    hpvResultHandler.getInputParameters(pantherResultHPV.negative, function(err, inputParameters) {
      if(err) assert.equal(err, '')
      assert.equal(inputParameters.reportNo, '18-7689.M1')
      assert.equal(inputParameters.accepted, 0)
      done()
    })
  })

  it('Negative Test', function (done) {
    hpvResultHandler.buildUpdateObject(pantherResultHPV.negative, function(err, updates) {
      if(err) {
        console.log('Error - ' + err)
        assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updates, 'tblHPVTestOrder', 'Result')
        var resultCode = resultHelper.getField(updates, 'tblPanelSetOrder', 'ResultCode')

        assert.equal(hpvResult.negative.result, result.value)
        assert.equal(hpvResult.negative.resultCode, resultCode.value)
      }
      done()
    })
  })

  it('Positive Test', function (done) {
    hpvResultHandler.buildUpdateObject(pantherResultHPV.positive, function(err, updates) {
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
    hpvResultHandler.buildUpdateObject(pantherResultHPV.invalid, function(err, updates) {
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
