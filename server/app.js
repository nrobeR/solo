var express = require('express');

var app = express();

app.get('/',function(req,res){
  res.sendfile('../client/index.html');
})

app.listen(3000);