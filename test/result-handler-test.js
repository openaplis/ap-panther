const assert = require('chai').assert
const path = require('path')

const resultHandler = require('../src/core/result-handler')


describe('Result Handler Tests', function () {
  it('HPV Test', function (done) {
    var hpvNegResults = {
      "PatientId":"999999",
      "LastName":" MOUSE",
      "FirstName":"MICKEY",
      "AliquotOrderId":"18-7689.1.2",
      "TestName":"HPV",
      "ICRLU":"277472",
      "ICInterpretation":"Valid",
      "AnalyteRLU":"0",
      "AnalyteSCO":"0.00",
      "OverallInterpretation":"Negative",
      "Analyte Cutoff":"",
      "IC Cutoff":""
    }
    resultHandler.handleResult(hpvNegResults, function(err, result) {
      if(err) {
        assert.equal(err, '')
      } else {
        assert.equal(result, 'all done')
      }
      done()
    })
  })

  it('GTHPV Test', function (done) {
    var gthpvNegResults = {
      "PatientId":"341160",
      "LastName":"MOUSE",
      "FirstName":"MICKEY",
      "AliquotOrderId":"18-7689.1.2",
      "TestName":"GT HPV",
      "IC/HPV 16 RLU":"202559",
      "HPV 16 S/CO":"0.31",
      "HPV 16 Result":"Negative",
      "HPV 18/45 RLU":"0",
      "HPV 18/45 S/CO":"0.00",
      "HPV 18/45 Result":"Negative",
      "ICInterpretation":"Valid",
      "HPV 16 Cutoff":"",
      "HPV 18/45 Cutoff":"",
      "IC Cutoff":""
    }
    resultHandler.handleResult(gthpvNegResults, function(err, result) {
      if(err) {
        assert.equal(err, '')
      } else {
        assert.equal(result, 'all done')
      }
      done()
    })
  })

  it('NGCT test', function(done) {
    var ngctNegResults = {
        "PatientId":"",
        "LastName":"MOUSE",
        "FirstName":"MICKEY",
        "AliquotOrderId":"18-7689.1.2",
        "TestName":"CT/GC",
        "TotalRLU":"9",
        "CTResult":"CT neg",
        "GCResult":"GC neg"
    }
    resultHandler.handleResult(ngctNegResults, function(err, result) {
      if(err) {
        assert.equal(err, '')
      } else {
        assert.equal(result, 'all done')
      }
      done()
    })
  })

  it("Trich Test", function(done) {
    var trichNegResults = {
      "PatientId":"",
      "LastName":"MOUSE",
      "FirstName":"MICKEY",
      "AliquotOrderId":"18-7689.1.2",
      "TestName":"TRICH",
      "Total RLU":"2",
      "TRICH Result":"TRICH neg"
    }
    resultHandler.handleResult(trichNegResults, function(err, result) {
      if(err) {
        assert.equal(err, '')
      } else {
        assert.equal(result, 'all done')
      }
      done()
    })
  })
})
