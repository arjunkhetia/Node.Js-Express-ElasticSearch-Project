var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../dbconfig');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // var mydata = await db.ping();
  // var mydata = await db.createindex('elasticindex');
  // var mydata = await db.checkindex('elasticindex');
  var data = {
    name: 'Arjun Khetia'
  };
  // var mydata = await db.createdocument('elasticindex', 1, '_doc', data);
  // var mydata = await db.updatedocument('elasticindex', 1, '_doc', data);
  var mydata = await db.searchdocument('elasticindex', data);
  // var mydata = await db.deletedocument('elasticindex', 1, '_doc');
  res.render('index', { title: JSON.stringify(mydata) });
});

module.exports = router;
