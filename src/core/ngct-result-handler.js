'use strict'

module.exports = {
  testName: 'CT/GC',
  handleResult: function (requestBody, ao, callback) {
    //resultData.ngResult = req.body.GCResult
    //resultData.ctResult = req.body.CTResult
    callback(null, 'all done.')
  }
}
