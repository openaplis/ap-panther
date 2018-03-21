'use strict'

module.exports = {
  bothNegative: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"17-9999.1.1",
    "TestName":"CT/GC",
    "TotalRLU":"9",
    "CTResult":"CT neg",
    "GCResult":"GC neg"
  },
  negativePositive: {
    "PatientId":"MOUSE",
    "LastName":"MICKEY",
    "FirstName":"",
    "AliquotOrderId":"CT-GC+ EQC",
    "TestName":"CT/GC",
    "TotalRLU":"1101",
    "CTResult":"CT neg",
    "GCResult":"GC POS"
  },
  invalid: {
    "PatientId":"",
    "LastName":"MOUSE",
    "FirstName":"MICKEY",
    "AliquotOrderId":"18-5576.1.2",
    "TestName":"CT/GC",
    "TotalRLU":"0",
    "CTResult":"Invalid",
    "GCResult":"Invalid"
  }
}
