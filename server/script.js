var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "park"
});
connection.connect(function(error) {
    if (error) {
        console.log("Error");
    } else {
        console.log("Connect");
    }
})

app.get('/api/park_tb', function(req, resp) {
  connection.query("SELECT * FROM park_tb", function(error, rows, fields){
    if (error) {
        console.log("Error query");
    } else {
        console.log("Successful query");
        resp.json(rows);

    }
  });
});

app.get('/api/pic_info', function(req, resp) {
  connection.query("SELECT * FROM pic_info", function(error, rows, fields){
    if (error) {
        console.log("Error query");
    } else {
        console.log("Successful query");
        resp.json(rows);
    }
  });
});
app.get('/api/data_info', function(req, resp) {
  connection.query("SELECT * FROM data_info", function(error, rows, fields){
    if (error) {
        console.log("Error query");
    } else {
        console.log("Successful query");
        resp.json(rows);
    }
  });
});

app.get('/api/admin', function(req, resp) {
  connection.query("SELECT * FROM admin", function(error, rows, fields){
    if (error) {
        console.log("Error query");
    } else {
        console.log("Successful query");
        resp.json(rows);
    }
  });
});


app.get('/api/picfromid=:id', function(req, resp) {

  connection.query("SELECT * FROM pic_info where id = "+ req.params.id , function(error, rows, fields){
    if (error) {
        console.log("Error query");
    } else {
        console.log("Successful query");
        resp.json(rows);
    }
  });
});

app.listen(1337);
