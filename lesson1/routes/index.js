var express = require('express');
var router = express.Router();
var multer = require('multer');
var shortid = require('shortid');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cau hinh noi luu tru file upload
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    // cau hinh ten file upload
    cb(null, shortid.generate() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

var Hotel = require('../models/hotel');
var Room = require('../models/room');

/* GET home page. */
router.get('/', function (req, res, next) {
  Hotel.find({}, function (err, data) {
    res.render('hotel/index', { cates: data });
  });
});
router.get('/hotel/addhotel', function (req, res, next) {
  res.render('hotel/addhotel');
});
router.post('/hotel/save-add', upload.single('image'), function (req, res, next) {
  var model = new Hotel();
  model.name = req.body.name;
  model.image = req.file.path.replace('public', '');
  model.city = req.body.city;
  model.address = req.body.address;
  model.owner = req.body.owner;
  model.license_number = req.body.license_number;
  model.total_floor = req.body.total_floor;
  model.save(function (err) {
    res.redirect('/');
  });
});
// update cates
router.get('/hotel/updatehotel/:id', function (req, res, next) {
  Hotel.findOne({ _id: req.params.id }, (err, data) => {
    res.render('hotel/updatehotel', { cates: data });
  })
});
router.post('/hotel/save-edit', upload.single('image'), function (req, res, next) {
  let { id, name, city, address, owner, license_number, total_floor } = req.body;
  Hotel.findOne({ _id: id }, function (err, model) {
    if (err) {
      res.send('Id khong ton tai');
    }
    model.name = name;
    model.city = city;
    model.address = address;
    model.owner = owner;
    model.license_number = license_number;
    model.total_floor = total_floor;
    if (req.file != null) {
      model.image = req.file.path.replace('public', '');
    }
    model.save(function (err) {
      if (err) {
        res.send('cap nhat khong thanh cong');
      }
      res.redirect('/');
    });
  });

});
//delete
router.get('/hotel/deletehotel/:cId', function (req, res, next) {
  Hotel.deleteOne({ _id: req.params.cId }, function (err) {
    if (err) {
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/');
  });
});

//add room
router.get('/room/index', function (req, res, next) {
  Room.find({}).populate('hotelid').exec(function (err, data) {
    if (err) {
      res.send('Da co loi he thong');
    }
    res.render('room/index', { room: data });
  });
});

router.get('/room/add', function (req, res, next) {
  Hotel.find({}, function (err, data) {
    res.render('room/add', { cates: data });
  })

});
router.post('/room/save-add', upload.single('image'), function (req, res, next) {
  var model = new Room();
  model.room_number = req.body.room_number;
  model.floor = req.body.floor;
  model.hotelid = req.body.hotelid;
  model.single_room = req.body.single_room;
  model.status = req.body.status;
  model.image = req.file.path.replace('public', '');
  model.price = req.body.price;
  model.detail = req.body.detail;
  model.save(function (err) {
    res.redirect('/room/index');
  });
});
router.get('/room/update/:cId', function (req, res, next) {
  Room.findOne({ _id: req.params.cId }, (err, data) => {
    if (err) {
      res.send('id khong ton tai');
    }
    Hotel.find({}, function (err, cates) {
      for (let i = 0; i < cates.length; i++) {
        if (cates[i].id == data.hotelid.toString()) {
          cates[i].selected = true;
          break;
        }
      }
      console.log(cates);
      res.render('room/update', { room: data, cates: cates });
    });

  });
});
router.post('/room/save-edit', upload.single('image'), function (req, res, next) {
  var cId = req.body.id;
  Room.findOne({ _id: cId }, function (err, model) {
    if (err) {
      res.send('id không tồn tại');
    }
    model.room_number = req.body.room_number;
    model.floor = req.body.floor;
    model.hotelid = req.body.hotelid;
    model.single_room = req.body.single_room;
    model.status = req.body.status;
    model.price = req.body.price;
    model.detail = req.body.detail;
    if (req.file != null) {
      model.image = req.file.path.replace('public', '');
    }
    //luu model lai
    model.save(function (err) {
      if (err) {
        res.send('Luu khong thanh cong');
      }
      res.redirect('/room/index');
    })
  })
});
router.get('/room/delete/:cId', function (req, res, next) {
  Room.deleteOne({ _id: req.params.cId }, function (err) {
    if (err) {
      res.send('Xoa khong thanh cong');
    }
    res.redirect('/room/index');
  });
});

module.exports = router;
