/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

// Get list of things
exports.index = function(req, res) {
  var query = req.query.query && JSON.parse(req.query.query);
  Thing.find(query).sort({_id: -1}).limit(20).populate('user', 'name').exec(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id).populate('user', 'name').exec(function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  req.body.user = req.user;
  Thing.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    if(thing.user.toString() !== req.user._id.toString()){
      return res.send(403);
    }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.star = function(req, res) {
  Thing.update({_id: req.params.id}, {$push: {stars: req.user}}, function(err, num){
    if (err) { return handleError(res, err); }
    if(num===0) { return res.send(404); }
    exports.show(req, res);
  });
};
exports.unstar = function(req, res) {
  Thing.update({_id: req.params.id}, {$pull: {stars: req.user}}, function(err, num){
    if (err) { return handleError(res, err); }
    if(num === 0) { return res.send(404); }
    exports.show(req, res);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}