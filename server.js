var express = require('express')
var livereload = require('express-livereload');
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(express.static('.'))

app.use(require('connect-livereload')({
    port: 35729
  }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

livereload(app, config={});