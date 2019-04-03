var express = require('express');
var router = express.Router();
var multer = require('multer');
var shortid = require('shortid');
// var upload = multer({ storage: storage});

var Category = require('../models/category');
var Product = require('../models/product');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cau hinh noi luu tru file upload
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    // cau hinh ten file upload
    cb(null, shortid.generate() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });
/* GET home page. */
router.get('/', function (req, res, next) {
  Category.find({}, function (err, data) {
    res.render('cates/index', { cates: data });
  });
});
router.get('/cates/addcates', function (req, res, next) {
  res.render('cates/addcates');
});
//add cates
router.post('/cates/save-add', upload.single('image'), function (req, res, next) {
  var model = new Category();
  model.name = req.body.name;
  // model.image = req.body.image;
  // lay anh = duong dan cua file vua upload len - loai bo tu public
  model.image = req.file.path.replace('public', '');
  model.description = req.body.description;
  model.save(function (err) {
    res.redirect('/');
  });
});
// update cates
router.get('/cates/updatecates/:cId', function (req, res, next) {
  Category.findOne({_id: req.param.cId}, (err, data) => {
    res.render('cates/updatecates', {cate: data});
  })
});
router.post('/cates/save-edit', upload.single('image'), function (req, res, next) {
  var cId = req.body.id;
  Category.findOne({ _id: cId }, function (err, model) {
    if (err) {
      res.send('id không tồn tại');
    }
    model.name = req.body.name;
    model.description = req.body.description;
    if (req.file != null) {
      model.image = req.file.path.replace('public', '');
    }
    //luu model lai
    model.save(function (err) {
      if (err) {
        res.send('Luu khong thanh cong');
      }
      res.redirect('/');
    })
  })
});



//delete
router.get('/cates/deletecates:cId', function (req, res, next) {
  Category.deleteOne({ _id: req.params.cId }, function (err) {
    if (err) {
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/');
  });
});
//product
router.get('/product/add', function (req, res, next) {
  res.render('product/add');
});
router.get('/product/update', function (req, res, next) {
  res.render('product/update');
});
router.get('/product/dialog', function (req, res, next) {
  res.render('product/dialog');
});
router.get('/product/index', function (req, res, next) {
  Product.find({}, function (err, data) {

    res.render('product/index', { product: data });
  });
});
router.post('/product/save-add', function (req, res, next) {
  var model = new Product();
  model.name = req.body.name;
  // lay anh = duong dan cua file vua upload len - loai bo tu public
  model.image = req.body.image;
  model.price = req.body.price;
  model.description = req.body.description;
  model.save();
  res.redirect('/product/index');
});
router.get('/product/delete/:cId', function (req, res, next) {
  Product.deleteOne({ _id: req.params.cId }, function (err) {
    if (err) {
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/product/index');
  });
});

module.exports = router;
