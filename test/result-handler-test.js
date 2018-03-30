const assert = require('chai').assert
const path = require('path')

const resultHandler = require('../src/core/result-handler')

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

describe('Result Handler Tests', function () {
  it('Negative Test', function (done) {
    resultHandler.handleResult(hpvNegResults, function(err, result) {
      if(err) {
        console.log('Error - ' + err)
        assert.equal(err, '')
      } else {
        assert.equal(result, 'all done')
      }
      done()
    })
  })
})
