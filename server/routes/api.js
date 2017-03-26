var express = require('express');
var mysql = require('mysql');
var path = require('path');
var app = express.Router();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "park"
});



app.get('/park_tb', function(req, resp) {
    connection.query("SELECT park_id,park_name,park_lat,park_long FROM `data_info2`", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);

        }
    });
});

app.get('/pic_info', function(req, resp) {
    connection.query("SELECT * FROM pic_info", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});
app.get('/data_info', function(req, resp) {
    connection.query("SELECT * FROM data_info", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

app.get('/admin', function(req, resp) {
    connection.query("SELECT * FROM admin", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});
app.get('/picfromid=:id', function(req, resp) {
    connection.query("SELECT * FROM pic_info where id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});


app.get('/locationfromid=:id', function(req, resp) {
    connection.query("SELECT park_id,park_name,park_lat,park_long FROM data_info2 WHERE park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});




app.get('/checkLogin/:id/:pwd', function(req, resp) {
    connection.query("SELECT * FROM admin where username = '" + req.params.id + "' and password = '" + req.params.pwd + "'", function(error, rows, field) {
        if (error) {
            console.log("Error query");
        } else {
            resp.json(rows);
            console.log("Successful query");
        }
    });
})

app.get('/detailfromid=:id', function(req, resp) {
    connection.query("SELECT * FROM data_info2 where park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});




app.get('/addfrom=:id', function(req, resp) {
    connection.query("SELECT * FROM data_info where park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});


app.post("/contactsummit", function(req, res) {
    var mname = req.body.email;
    console.log("id: " + mname);
    res.redirect("/api/contact2/" + mname);
});


module.exports = app;
