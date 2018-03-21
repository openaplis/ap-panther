var path = require('path')
var pantherService = require(path.join(__dirname, './core/panther-service'))

pantherService.start(function (err, message) {
  if(err) return console.log(err)
  console.log(message)
})
