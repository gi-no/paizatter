'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TinySegmenter = require('tiny-segmenter');

var ThingSchema = new Schema({
  name: String,
  tokenizedName: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  stars: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});
ThingSchema.index({tokenizedName: 'text', name: 'text'});
ThingSchema.pre('save', function(next){
  var tinySegmenter = new TinySegmenter();
  this.tokenizedName = tinySegmenter.segment(this.name).join(' ');
  next();
});

module.exports = mongoose.model('Thing', ThingSchema);