console.log("Arrancando server de Node!!!");

var database = {
  user: "tatistobona",
  password: "papilonio"
};

var parser = require("body-parser");
var express = require("express");
var web = express();
var path = require("path");
web.use( parser.urlencoded() );
var server;

server = web.listen(8080, function () {
  console.log("Servidior arrancado :D");
} );

web.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/../formulario.html'));
} );

web.post("/entrar", function (req, res) {
  console.log(req.body)
  if(req.body.user == database.user && req.body.password == database.password){
    res.sendFile(path.join(__dirname + '/../exito.html'));
  }else{
    res.sendFile(path.join(__dirname + '/../error.html'));
  }
} );
