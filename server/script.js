var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var fs = require("fs")
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
    connection.query("SELECT * FROM admin where username = '" + req.params.id + "' and password = '" + req.params.pwd + "'", function(error, rows, field) {
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

app.get('/api/addfrom=:id', function(req, resp) {
    connection.query("SELECT * FROM data_info where park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});


app.get('/api/insertdetail=:parkid/:titleid/:detail', function(req, resp) {
    var ran = Math.floor((Math.random() * 100) + 900);
    console.log("random: " + ran);
    var mquery = "INSERT INTO data_info VALUES  (" + ran + "," + req.params.parkid + "," + req.params.titleid + ",'test','" + req.params.detail + "')";
    resp.end(mquery);
    connection.query(mquery, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
        }
    });
});

app.get('/api/test/:name/:email/:phone/:title/:detail', function(req, resp) {

    fs.writeFile("contact/" + req.params.title + ".txt",
        "ชื่อ:" + req.params.name + "\r\nอีเมล: " + req.params.title + "\r\nเบอร์ติดต่อ:" + req.params.name + "\r\nหัวข้อ: " + req.params.title + "\r\nเนื้อหา:" + req.params.detail + "",
        function(err) {
            if (err) {
                return console.error(err);
            }

            console.log("Data written successfully!");
            console.log("Let's read newly written data");
            fs.readFile("/contact/" + req.params.detail + ".txt", function(err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("Asynchronous read: " + data.toString());
            });
        });


});


app.get('/api/contact2/:id', function(req, res) {
    var id = req.params.id;
    console.log("name: " + id);
});
app.post("/api/contactsummit",function(req,res){
  var mname = req.body.email;
  console.log("id: " + mname);
  res.redirect("/api/contact2/" + mname);
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.get('/map', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/map.html'));
});
app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/contact.html'));
});
app.get('/parkdetail:id', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/parkdetail.html'));
});



app.listen(1337);
