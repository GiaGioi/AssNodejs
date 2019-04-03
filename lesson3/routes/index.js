var express = require('express');
var router = express.Router();
var Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res, next) {
  Category.find({}, function(err, data){
    res.render('category/index', {categories: data});
  })
});

module.exports = router;