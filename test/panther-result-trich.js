'use strict'

module.exports = {
  negative: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-9999.1.1",
    "TestName":"TRICH",
    "Total RLU":"2",
    "TRICH Result":"TRICH neg"
  },
  positive: {
    "PatientId":"341384",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-9999.1.1",
    "TestName":"TRICH",
    "Total RLU":"1249",
    "TRICH Result":"TRICH POS"
  },
  invalid: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-9999.1.1",
    "TestName":"TRICH",
    "Total RLU":"0",
    "TRICH Result":"Invalid"
  }
}
