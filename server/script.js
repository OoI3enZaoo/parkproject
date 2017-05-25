var express = require('express');
var mailer = require('express-mailer');
var mysql = require('mysql');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");




var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "park"
});
connection.connect(function(error) {
    if (error) {
        console.log("MySQL can't connect");
    } else {
        console.log("MySQL has been Connected");
    }
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/picture')));






var myid = 1;
app.get('/parkdetail=:id', function(req, res) {
    myid = req.params.id;;
    res.sendFile(path.join(__dirname + '/views/parkdetail.html'));
});
app.get('/apii/getdetail', function(req, res) {
    var query = "SELECT * FROM data_info2 where park_id =" + myid;
    console.log(query);
    connection.query(query, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query2");
            res.json(rows);
        }
    });
});
app.get('/', function(req, resp) {
    resp.redirect("/home");
});
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/map.html'));
});
app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/contact.html'));
});
app.get('/panorama', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/panorama.html'));
});

app.get('/aboutus',function(req,res){
  res.sendFile(path.join(__dirname + '/views/about.html'));
})
var manage = require('./routes/manage.js');
app.use('/manage', manage);

var api = require('./routes/api.js');
app.use('/api', api);

var email = require('./routes/sendemail.js')
app.use('/sendemail',email);


var port = 8080;
app.listen(port);
console.log("Server is running on port :" + port);
