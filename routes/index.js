var express = require('express');
var router = express.Router();
var utils = require('../app/utils');

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
    stand_until_21: '27 kvm (24.600,-)',
    opening_hours_to_24: 'Ja',
    license_open_until_21: 'Nei',
    license_open_until_24: 'Ja',
    extra_space: '',
    addition: '',
    proposal: 'Additional transportation needed. And some markers on the area. Extra space for garbage.',
    note: 'Ciao ragazzi!' };

  res.render('confirmation', model);
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

      req.body['pdf_path'] = '/download/' + result.filename;

      res.render('confirmation', req.body);
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

module.exports = router;
