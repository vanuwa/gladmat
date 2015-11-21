var express = require('express');
var router = express.Router();
var utils = require('../app/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log('[ POST ] body', req.body);

  utils.generatePDF(req.body, function (error, result) {
    if (error) {
      console.log('[ ERROR ]', error);
    } else {
      console.log('[ PDF::PATH ]', result);
      res.render('index', { title: 'Express' });
    }
  });

});

module.exports = router;
