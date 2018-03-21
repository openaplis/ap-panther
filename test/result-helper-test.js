'use strict'

const assert = require('chai').assert
const resultHelper = require('../src/core/result-helper')

describe('HPV Tests', function () {

  it('Accept Test', function (done) {

    var result = { fields: [] }
    resultHelper.autoAccept(result)    

    var accepted = result.fields.find(function (element) {
      return element.name == 'Accepted'
    })

    assert.isNotNull(accepted)
    assert.equal(accepted.value, 1)

    var acceptedBy = result.fields.find(function (element) {
      return element.name == 'AcceptedBy'
    })
    assert.isNotNull(acceptedBy)
    assert.equal(acceptedBy.value, 'AUTOVER TESTING')

    var acceptedById = result.fields.find(function (element) {
      return element.name == 'AcceptedById'
    })
    assert.isNotNull(acceptedById)
    assert.equal(acceptedById.value, 5134)

    var acceptedDate = result.fields.find(function (element) {
      return element.name == 'AcceptedDate'
    })
    assert.isNotNull(acceptedDate)
    assert.isNotNull(result.fields[3].value)

    var acceptedTime = result.fields.find(function (element) {
      return element.name == 'AcceptedTime'
    })
    assert.isNotNull(acceptedTime)
    assert.isNotNull(acceptedTime.value)

    done()
  })

  it('Final Test', function (done) {
    var result = { fields: [] }
    resultHelper.autoAccept(result)
    resultHelper.autoFinal(result)

    var final = result.fields.find(function (element) {
      return element.name == 'Final'
    })
    assert.isNotNull(final)
    assert.equal(final.value, 1)

    var signature = result.fields.find(function (element) {
      return element.name == 'Signature'
    })
    assert.isNotNull(signature)
    assert.equal(signature.value, 'AUTOVER TESTING')

    var finaledById = result.fields.find(function (element) {
      return element.name == 'FinaledById'
    })
    assert.isNotNull(finaledById)
    assert.equal(finaledById.value, 5134)

    var finalDate = result.fields.find(function (element) {
      return element.name == 'FinalDate'
    })
    assert.isNotNull(finalDate)
    assert.isNotNull(finalDate.value)

    var finalTime = result.fields.find(function (element) {
      return element.name == 'FinalTime'
    })
    assert.isNotNull(finalTime)
    assert.isNotNull(finalTime.value)

    done()
  })

})
