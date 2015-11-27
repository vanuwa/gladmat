var express = require('express');
var router = express.Router();
var utils = require('../app/utils');
var Storage = require('../app/storage');
var storage = new Storage();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/confirmation', function(req, res, next) {
  console.log(' [ confirmation ] body', req.body);
  var model = { company_name: 'Avokado Art',
    tax_id: '111111',
    email: 'contact@bc.com',
    contact_person: 'Bill Shon',
    stand_name: 'Bullcentury',
    address: 'via Country, 1, Avokado street',
    billing_address: 'via Country, 1, Avokado street, 42',
    zip_code: '098547',
    city: 'Village',
    phone: '+39564875215',
    cellphone: '+393296547812',
    website: 'http://avokado.com',
    stand_until_21: 'custom',
    stand_until_21_custom: '473463',
    opening_hours_to_24: 'on',
    license_open_until_21: '',
    license_open_until_24: 'on',
    extra_space: '3284673',
    addition: '1432432',
    proposal: 'Additional transportation needed. And some markers on the area. Extra space for garbage.',
    note: 'Ciao ragazzi!' };

  res.render('confirmation/show', model);
});

router.get('/thanks', function(req, res, next) {
  res.render('thanks');
});

router.post('/', function(req, res, next) {
  console.log('[ POST / ] body', req.body);

  utils.generatePDF(req.body, function (error, result) {
    if (error) {
      console.log('[ ERROR ]', error);
    } else {
      console.log('[ PDF::PATH ]', result);

      var doc = req.body;
      doc.pdf = result;

      storage.save(doc, function () {

        req.body['pdf_path'] = '/download/' + doc.pdf.filename;

        res.render('confirmation/show', req.body);
      });
    }
  });
});

router.post('/complete', function(req, res, next) {
  console.log('[ POST /complete ] body', req.body);

  res.render('thanks');
});

router.get('/download/:name', function(req, res, next) {
  var path = 'public/files/' + req.params.name;

  res.download(path);
});

router.get('/participants', function(req, res, next) {
  storage.read_all(function (docs) {
    res.render('participants/index', { docs: docs });
  });
});

router.get('/participants/:id', function(req, res, next) {
  storage.read(req.params.id, function (docs) {
    res.render('participants/show', docs[0]);
  });
});


module.exports = router;
