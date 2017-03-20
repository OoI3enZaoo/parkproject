var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
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
});
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/park_tb', function(req, resp) {
    connection.query("SELECT * FROM park_tb", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);

        }
    });
});

app.get('/api/pic_info', function(req, resp) {
    connection.query("SELECT * FROM pic_info", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});
app.get('/api/data_info', function(req, resp) {
    connection.query("SELECT * FROM data_info", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

app.get('/api/admin', function(req, resp) {
    connection.query("SELECT * FROM admin", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});
app.get('/api/picfromid=:id', function(req, resp) {
    connection.query("SELECT * FROM pic_info where id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

app.get('/api/namefromid=:id', function(req, resp) {
    connection.query("SELECT * FROM park_tb where park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

app.get('/api/checkLogin/:id/:pwd', function(req, resp) {
    connection.query("SELECT * FROM admin where username = '"+req.params.id+"' and password = '"+req.params.pwd+"'", function(error, rows, field) {
        if (error) {
            console.log("Error query");
        } else {
            resp.json(rows);
            console.log("Successful query");
        }
    });
})

app.get('/api/detailfromid=:id', function(req, resp) {
    connection.query("SELECT * FROM data_info where park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/map.html'));
});



app.listen(1337);
