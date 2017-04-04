var express = require('express');
var mysql = require('mysql');
var app = express.Router();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.post('/email',function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var subject = req.body.subject;
  var message = req.body.message;

console.log("name: " + name + " email: " + email + " mobile: " + mobile + " subject: " + subject  + " message: " + message);


  var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'Blend.Theerapat@gmail.com', // Your email id
              pass: '132056401203' // Your password
          }
      });
      var mailOptions = {
          from: email, // sender address
          to: 'Blend.Theerapat@gmail.com', // list of receivers
          subject: subject, // Subject line
          //text: message //, // plaintext body
           html: "<h3>ชื่อ: "+name+"</h3><h3>อีเมล์:  "+email+"</h3><h3>โทรศัพท์:  "+mobile+"</h3><h3>หัวข้อ: "+subject+"</h3> <h3>"+message+"</h3>" // You can choose to send an HTML body instead
      };
      transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          //res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          //res.json({yo: info.response});
      };
  });




});

module.exports = app;
