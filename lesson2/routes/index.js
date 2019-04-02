var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
  res.send('ok');
});

// var Category = require('../models/category');

// router.get('/', async (req, res, next) => {
//   let cates = await Category.find({});
//   console.log(cates.length);
//   res.send('ok');
// });