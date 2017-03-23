var express = require('express');
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
        console.log("Error");
    } else {
        console.log("Connect");
    }
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, resp) {

  resp.redirect("/home");
  //res.sendFile(path.join(__dirname + '/views/parkdetail.html'));

});
app.get('/api/park_tb', function(req, resp) {
    connection.query("SELECT park_id,park_name,park_lat,park_long FROM `data_info2`", function(error, rows, fields) {
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


app.get('/api/locationfromid=:id', function(req, resp) {
    connection.query("SELECT park_id,park_name,park_lat,park_long FROM data_info2 WHERE park_id = " + req.params.id, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("Successful query");
            resp.json(rows);
        }
    });
});

// app.get('/api/namefromid=:id', function(req, resp) {
//     connection.query("SELECT * FROM park_tb where park_id = " + req.params.id, function(error, rows, fields) {
//         if (error) {
//             console.log("Error query");
//         } else {
//             console.log("Successful query");
//             resp.json(rows);
//         }
//     });
// });

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
    connection.query("SELECT * FROM data_info2 where park_id = " + req.params.id, function(error, rows, fields) {
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

//
// app.get('/api/insertdetail=:parkid/:titleid/:detail', function(req, resp) {
//     var ran = Math.floor((Math.random() * 100) + 900);
//     console.log("random: " + ran);
//     var mquery = "INSERT INTO data_info VALUES  (" + ran + "," + req.params.parkid + "," + req.params.titleid + ",'test','" + req.params.detail + "')";
//     resp.end(mquery);
//     connection.query(mquery, function(error, rows, fields) {
//         if (error) {
//             console.log("Error query");
//         } else {
//             console.log("Successful query");
//         }
//     });
// });




/*app.get('/api/contact2/:id', function(req, res) {
    var id = req.params.id;
    console.log("name: " + id);
});*/
app.post("/api/contactsummit", function(req, res) {
    var mname = req.body.email;
    console.log("id: " + mname);
    res.redirect("/api/contact2/" + mname);
});
//
app.post("/api/addpark", function(req, res) {
    var id = req.body.id;
    var namepark = req.body.namepark;
    var shortinfo = req.body.shortinfo;
    var info = req.body.info;
    var map = req.body.map;
    var master = req.body.master;
    var terrain = req.body.terrain //ภูมิประเทศ
    var climate = req.body.climate; // ภูมิอากา
    var plant_and_wildlife = req.body.plant_and_wildlife;
    var interesting_point = req.body.interesting_point;
    var travelling = req.body.travelling;
    var reference = req.body.reference;
    var lat = req.body.lat;
    var long = req.body.long;

    var parkid;

    connection.query("SELECT MAX(park_id) as max FROM data_info2", function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("UPDATE data_info");
        }
        parkid = rows[0].max + 1;
    });




    var mquery = "INSERT INTO data_info VALUES  (" + parkid + "," + parkid + ",0,'"+shortinfo+")";
    connection.query(mquery, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("UPDATE data_info");
        }
    });
});
app.post("/api/editpark", function(req, res) {
    var id = req.body.id;
    var namepark = req.body.namepark;
    var shortinfo = req.body.shortinfo;
    var info = req.body.info;
    var map = req.body.map;
    var master = req.body.master;
    var terrain = req.body.terrain //ภูมิประเทศ
    var climate = req.body.climate; // ภูมิอากา
    var plant_and_wildlife = req.body.plant_and_wildlife;
    var interesting_point = req.body.interesting_point;
    var travelling = req.body.travelling;
    var reference = req.body.reference;
    var lat = req.body.lat;
    var long = req.body.long;
    var query  = "UPDATE data_info2 SET park_id = " + id + " , park_name = '" + namepark + "' , park_shortinfo  = '"+shortinfo+"' , park_info ='"+info+"' , park_position = '"+map+"', park_master = '"+master+"' , park_terrain ='"+terrain+"', park_climate='"+climate+"' , park_wildlife='"+plant_and_wildlife+"' , park_interesting='"+interesting_point+"' , park_travelling = '"+travelling+"' , park_reference= '"+reference+"', park_lat = '"+lat+"' , park_long='"+long+"'  WHERE park_id = " + id;
    connection.query(query, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("UPDATE data_info2");
        }
    });
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
var myid = 1;
app.get('/parkdetail=:id', function(req, res) {
    myid = req.params.id;;
    res.sendFile(path.join(__dirname + '/views/parkdetail.html'));
});
app.get('/api/getdetail',function(req , res){
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




app.listen(1337);
