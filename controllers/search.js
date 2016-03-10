/**
 * Module dependencies.
 */
var express = require('express');
var Book = require('../models/Book');


// expose

var router = module.exports = express.Router();

// GET /searches

router.get('/', function(req, res, next){
  res.render('search', {
    title: 'Search'
  });
});

// POST /searches

router.post('/', function(req, res, next){

  var query = {};
  //console.log(req.body);
  for (var k in req.body){
  	if ('_csrf' === k) continue;

  	var v = req.body[k];
    if (v) query[k] = RegExp(v, 'i');
  }
  //console.log(query);
  //query.userId= req.user.id;
  Book.find(query, function(err, docs){
    if (err) return next(err);

    if (docs.length === 0){
      req.flash('errors', { msg: 'No book matching that criteria is in our database.'});
    }
    
    res.render('search', { searches: docs });
  });

});
