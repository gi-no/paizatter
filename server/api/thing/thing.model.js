'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  stars: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
});

module.exports = mongoose.model('Thing', ThingSchema);