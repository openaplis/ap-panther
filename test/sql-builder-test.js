const assert = require('chai').assert
const path = require('path')

const sqlBuilder = require('../src/core/sql-builder')
const resultHelper = require('../src/core/result-helper')
const pantherResultHPV = require(path.join(__dirname, 'panther-result-hpv'))
const hpvResultHandler = require('../src/core/hpv-result-handler')
const hpvResult = require('../src/core/hpv-result')

var inputParams = {
  reportNo: '18-99999',
  accepted: false,
  papIsFinal: true,
  specimenIsUnsat: true
}

describe('Sql Tests', function () {
  it('HPV Negative Test', function (done) {
    var updates = hpvResultHandler.handleResult(pantherResultHPV.negative, inputParams)
    var hpvUpdate = updates[0]
    console.log('update = ' + hpvUpdate)
    var statement = sqlBuilder.createStatement(hpvUpdate)
    var updateStatement = 'update tblHPVTestOrder set Result = \'Negative\', Comment = \'HPV testing of unsatisfactory specimens may yield false negative results.  Recommend repeat HPV testing.\' where ReportNo = \'18-99999\';'

    assert.equal(statement, updateStatement)
    done()
  })
})
