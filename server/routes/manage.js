var express = require('express');
var mysql = require('mysql');
var app = express.Router();

// middleware specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "park"
});

app.get('/', function(req, res) {
    res.send("/adddpark to add a park <br> /editpark to edit a park <br> /removepark to remove a park");
});
app.post("/addpark", function(req, res) {
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
    var urlpic = req.body.urlpic;

    var parkid = 0;

    connection.query("SELECT MAX(park_id) as max FROM data_info2", function(error, rows, fields) {
      parkid = rows[0].max + 1;
        if (error) {
            console.log("SELECT MAX Error query");
        } else {
            console.log("SELECT MAX park_id: " + parkid);
        }

        var mquery = "INSERT INTO data_info2 VALUES(" + parkid + ",'" + namepark + "','" + shortinfo + "','" + info + "','" + map + "','" + master + "','" + terrain + "','" + climate + "','" + plant_and_wildlife + "','" + interesting_point + "','" + travelling + "','" + reference + "','" + lat + "','" + long + "')";
        connection.query(mquery, function(error, rows, fields) {
            if (error) {
                console.log("Error query");
            } else {
                console.log("UPDATE data_info");
            }

        });

        var mquery2 = "INSERT INTO pic_info VALUES(" + parkid + ",'" + urlpic + "')";
        connection.query(mquery2, function(error, rows, fields) {
            if (error) {
                console.log("Error query");
            } else {
                console.log("UPDATE pic_info");
            }

        });


    });

});
app.post("/editpark", function(req, res) {
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
    var query = "UPDATE data_info2 SET park_name = '" + namepark + "' , park_shortinfo  = '" + shortinfo + "' , park_info ='" + info + "' , park_position = '" + map + "', park_master = '" + master + "' , park_terrain ='" + terrain + "', park_climate='" + climate + "' , park_wildlife='" + plant_and_wildlife + "' , park_interesting='" + interesting_point + "' , park_travelling = '" + travelling + "' , park_reference= '" + reference + "', park_lat = '" + lat + "' , park_long='" + long + "'  WHERE park_id = " + id;
    connection.query(query, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("UPDATE data_info2");
        }
    });
    console.log(query);
    //res.send("test");
});


app.post("/removepark", function(req, res) {
    var id = req.body.id;
    var query = "DELETE FROM data_info2 WHERE park_id ="+id+"";
    connection.query(query, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("REMOVE data_info2");
        }
    });
    var query = "DELETE FROM pic_info WHERE id ="+id+"";
    connection.query(query, function(error, rows, fields) {
        if (error) {
            console.log("Error query");
        } else {
            console.log("REMOVE pic_info");
        }
    });
});
module.exports = app;
