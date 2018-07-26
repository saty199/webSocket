var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');
var mongodb= require('mongodb');
var http = require('http');
var config = require('./config');
var User= require('./models/user');

// App setup
var app = express();
var db = config.db;
mongoose.connect(db, (err, res)=>{
  if(err){
    console.log("error", err);
  }
  console.log("**Database is connected**");
});

// app.set('view engine', 'ejs');
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

app.use(express.static('public'));

// Socket setup & pass server

var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('message',function(data){
      console.log("Message data saved",data)
      var mess = new User({
        message : data.message,
        handle : data.handle
      });

      mess.save(function(err){
        console.log('data saved successfully');
        if(err){
          console.log("error", err);
        }
      });
    })
});
