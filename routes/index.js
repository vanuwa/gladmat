var express = require('express');
var router = express.Router();
var utils = require('../app/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gladmat 2016' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Gladmat 2016' });
});

router.get('/confirmation', function(req, res, next) {
  var model = { company_name: 'Bullcentury',
    organization_number: '1',
    email: 'contact@bc.com',
    contact_person: 'Bill Shon',
    stand_name: 'Bullcentury',
    address1: 'via Country',
    address2: '42',
    billing_address: '',
    zip_code: '098547',
    city: 'Planet Earth',
    phone: '+39564875215',
    cellphone: '+393296547812',
    website: 'bullcentury.com',
    extra_space: '',
    addition: '',
    proposal: '',
    note: 'Ciao ragazzi!' };

  res.render('confirmation', model);
});

router.post('/', function(req, res, next) {
  console.log('[ POST ] body', req.body);

  utils.generatePDF(req.body, function (error, result) {
    if (error) {
      console.log('[ ERROR ]', error);
    } else {
      console.log('[ PDF::PATH ]', result);

      req.body['pdf_path'] = '/download/' + result.filename;
      res.render('confirmation', req.body);
    }
  });
});

router.get('/download/:name', function(req, res, next) {
  var path = 'public/files/' + req.params.name;

  res.download(path);
});

module.exports = router;
