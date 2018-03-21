var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var path = require('path')

var resultHandler = require(path.join(__dirname, 'result-handler'))

module.exports = {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send('I am Iris, greek goddes of the rainbow.')
  })

  app.post('/panther', function(req, res) {
    console.log("LISa received result from Panther: " + req.body.TestName + " - " + req.body.AliquotOrderId)
    resultHandler.handleResult(req.body, function (err, callback) {
      res.send("Result Received")
    })
  })

  var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Optimus Prime listening at http://%s:%s', host, port)
  })
}
