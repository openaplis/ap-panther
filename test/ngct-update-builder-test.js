const assert = require('chai').assert
const path = require('path')

const resultHelper = require('../src/core/result-helper')
const pantherResultNGCT = require(path.join(__dirname, 'panther-result-ngct'))
const ngctUpdateBuilder = require('../src/core/ngct-update-builder')
const ngctResult = require('../src/core/ngct-result')

describe('NGCT Tests', function () {
  it('Both Negative Test', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.bothNegative, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.negative.result, ngresult.value)
        assert.equal(ngctResult.ng.negative.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.negative.result, ctresult.value)
        assert.equal(ngctResult.ct.negative.resultCode, ctresultCode.value)
      }
      done()
    })
  })

  it('NGPositive CTNegative Test', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.negativePositive, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.positive.result, ngresult.value)
        assert.equal(ngctResult.ng.positive.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.negative.result, ctresult.value)
        assert.equal(ngctResult.ct.negative.resultCode, ctresultCode.value)
      }
      done()
    })
  })

  it('Invalid Test', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.invalid, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.invalid.result, ngresult.value)
        assert.equal(ngctResult.ng.invalid.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.invalid.result, ctresult.value)
        assert.equal(ngctResult.ct.invalid.resultCode, ctresultCode.value)
      }
      done()
    })
  })

  it('Madeup Neg Pos Test', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.madeupPositiveNegative, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.negative.result, ngresult.value)
        assert.equal(ngctResult.ng.negative.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.positive.result, ctresult.value)
        assert.equal(ngctResult.ct.positive.resultCode, ctresultCode.value)
      }
      done()
    })
  })

  it('Madeup Both Pos', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.madeupPositivePositive, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.positive.result, ngresult.value)
        assert.equal(ngctResult.ng.positive.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.positive.result, ctresult.value)
        assert.equal(ngctResult.ct.positive.resultCode, ctresultCode.value)
      }
      done()
    })
  })

  it('MadeUp Neg Invalid Test', function (done) {
    ngctUpdateBuilder.buildUpdateObject(pantherResultNGCT.madeupNegativeInvalid, function(err, updates) {
      if(err) { assert.equal(err, '')
      } else {
        var ngresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NeisseriaGonorrhoeaeResult')
        var ngresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'NGResultCode')
        var ctresult = resultHelper.getField(updates, 'tblNGCTTestOrder', 'ChlamydiaTrachomatisResult')
        var ctresultCode = resultHelper.getField(updates, 'tblNGCTTestOrder', 'CTResultCode')

        assert.equal(ngctResult.ng.negative.result, ngresult.value)
        assert.equal(ngctResult.ng.negative.resultCode, ngresultCode.value)
        assert.equal(ngctResult.ct.invalid.result, ctresult.value)
        assert.equal(ngctResult.ct.invalid.resultCode, ctresultCode.value)
      }
      done()
    })
  })
})
