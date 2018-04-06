'use strict'

module.exports = {
  bothNegative: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"9",
    "CTResult":"CT neg",
    "GCResult":"GC neg"
  },
  negativePositive: {
    "PatientId":"MOUSE",
    "LastName":"MICKEY",
    "FirstName":"",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"1101",
    "CTResult":"CT neg",
    "GCResult":"GC POS"
  },
  invalid: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"0",
    "CTResult":"Invalid",
    "GCResult":"Invalid"
  },
  madeupPositiveNegative: {
    "PatientId":"MOUSE",
    "LastName":"MICKEY",
    "FirstName":"",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"1101",
    "CTResult":"CT POS",
    "GCResult":"GC neg"
  },
  madeupPositivePositive: {
    "PatientId":"MOUSE",
    "LastName":"MICKEY",
    "FirstName":"",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"1101",
    "CTResult":"CT POS",
    "GCResult":"GC POS"
  },
  madeupNegativeInvalid: {
    "PatientId":"MOUSE",
    "LastName":"MICKEY",
    "FirstName":"",
    "AliquotOrderId":"17-999999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"1101",
    "CTResult":"Invalid",
    "GCResult":"GC neg"
  }
}
