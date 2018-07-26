var express= require('express');
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var userSchema= new Schema({
  handle : String,
  message: String

});

module.exports = mongoose.model('User', userSchema);
