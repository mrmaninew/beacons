var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Beacons' });
    res.status(200).sendFile('../public/templates/index.html');
});

module.exports = router;