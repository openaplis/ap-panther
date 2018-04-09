const assert = require('chai').assert
const path = require('path')

const resultHandler = require('../src/core/result-handler')
const pantherResultHPV = require(path.join(__dirname, 'panther-result-hpv'))
const hpvUpdateBuilder = require('../src/core/hpv-update-builder')
const hpvResult = require('../src/core/hpv-result')
const resultHelper = require('../src/core/result-helper')

describe('Result Handler Tests', function () {
  it('GetUpdateBuilder Test', function(done) {
    resultHandler.getUpdateBuilder(pantherResultHPV.negative, function(err, resultData, builder) {
      if(err) return callback(err)
      assert.equal(builder.testName, 'HPV')
      done()
    })
  })

  it('GetInputParameters Test', function(done) {
    var results = {
      "PatientId":"999999",
      "LastName":" MOUSE",
      "FirstName":"MICKEY",
      "AliquotOrderId":"18-8321.1.2",
      "TestName":"HPV",
      "ICRLU":"277472",
      "ICInterpretation":"Valid",
      "AnalyteRLU":"0",
      "AnalyteSCO":"0.00",
      "OverallInterpretation":"Negative",
      "Analyte Cutoff":"",
      "IC Cutoff":""
    }
    resultHandler.getInputParameters(results, hpvUpdateBuilder, function(err, resultData, builder, inputParams) {
      if(err) return callback(err)
      console.log(inputParams)
      assert.equal(inputParams.reportNo, '18-8321.M1')
      assert.equal(inputParams.accepted, 1)
      assert.equal(inputParams.holdForWHP, 0)
      assert.equal(inputParams.distributeWHPOnly, 0)
      assert.equal(inputParams.hasWHP, 1)
      assert.equal(inputParams.whpIsFinal, 1)
      done()
    })
  })

  it('BuildUpdateObject Test', function(done) {
    var results = {
      "PatientId":"999999",
      "LastName":" MOUSE",
      "FirstName":"MICKEY",
      "AliquotOrderId":"17-999999.1.1",
      "TestName":"HPV",
      "ICRLU":"277472",
      "ICInterpretation":"Valid",
      "AnalyteRLU":"0",
      "AnalyteSCO":"0.00",
      "OverallInterpretation":"Negative",
      "Analyte Cutoff":"",
      "IC Cutoff":""
    }

    var inputParams = {
      reportNo: '17-999999.M1',
      accepted: 0,
      holdForWHP: 1,
      distributeWHPOnly: 0,
      hasWHP: 1,
      whpIsFinal: 1
    }
    resultHandler.buildUpdateObject(results, hpvUpdateBuilder, inputParams, function(err, updateObject) {
      if(err) { assert.equal(err, '')
      } else {
        var result = resultHelper.getField(updateObject, 'tblHPVTestOrder', 'Result')
        var holdDist = resultHelper.getField(updateObject, 'tblPanelSetOrder', 'HoldDistribution')

        assert.equal(results.OverallInterpretation, result.value)
        assert.equal(0, holdDist.value)
      }
      inputParams.whpIsFinal = 0
      resultHandler.buildUpdateObject(results, hpvUpdateBuilder, inputParams, function(err, updateObject) {
        if(err) { assert.equal(err, '')
        } else {
          var result = resultHelper.getField(updateObject, 'tblHPVTestOrder', 'Result')
          var holdDist = resultHelper.getField(updateObject, 'tblPanelSetOrder', 'HoldDistribution')

          assert.equal(results.OverallInterpretation, result.value)
          assert.equal(1, holdDist.value)
        }
        done()
      })
    })
  })

  it('UpdateDatabase Test', function(done) {
    var updateObject = [
      {
        "type":"update",
        "tableName":"tblHPVTestOrder",
        "primaryKey":"ReportNo",
        "primaryKeyValue":"17-999999.M1",
        "fields":[
          {
            "name":"Result",
            "value":"Negative"
          }
        ]
      },
      {
        "type":"update",
        "tableName":"tblPanelSetOrder",
        "primaryKey":"ReportNo",
        "primaryKeyValue":"17-999999.M1",
        "fields":[
          {
            "name":"ResultCode",
            "value":"HPVNGTV"
          },
          {
            "name":"HoldDistribution",
            "value":0
          },
          {
            "name":"Accepted",
            "value":1
          },
          {
            "name":"AcceptedBy",
            "value":"AUTOVER TESTING"
          },
          {
            "name":"AcceptedById",
            "value":5134
          },
          {
            "name":"AcceptedDate",
            "value":"2018-04-09"
          },
          {
            "name":"AcceptedTime",
            "value":"2018-04-09 11:00"
          },
          {
            "name":"Final",
            "value":1
          },
          {
            "name":"Signature",
            "value":"AUTOVER TESTING"
          },
          {
            "name":"FinaledById",
            "value":5134
          },
          {
            "name":"FinalDate",
            "value":"2018-04-09"
          },
          {
            "name":"FinalTime",
            "value":"2018-04-09 11:00"
          }
        ]
      }
    ]

    resultHandler.updateDatabase(updateObject, function(err, sql) {
      if(err) { assert.equal(err, '')
      } else {
        assert.equal('update tblHPVTestOrder set Result = \'Negative\' where ReportNo = \'17-999999.M1\'; update tblPanelSetOrder set ResultCode = \'HPVNGTV\',HoldDistribution = \'0\',Accepted = \'1\',AcceptedBy = \'AUTOVER TESTING\',AcceptedById = \'5134\',AcceptedDate = \'2018-04-09\',AcceptedTime = \'2018-04-09 11:00\',Final = \'1\',Signature = \'AUTOVER TESTING\',FinaledById = \'5134\',FinalDate = \'2018-04-09\',FinalTime = \'2018-04-09 11:00\' where ReportNo = \'17-999999.M1\';', sql)
      }
      done()
    })
  })
})
