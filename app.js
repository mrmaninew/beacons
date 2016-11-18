var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname + '/public/templates/index.html'));
});




var eddystoneBeacon = require('eddystone-beacon');
var ngrok = require('ngrok');
var Promise = require('promise');

var options = {
    name: 'Beacon', // set device name when advertising (Linux only)
    txPowerLevel: -22, // override TX Power Level, default value is -21,
    tlmCount: 2, // 2 TLM frames
    tlmPeriod: 10 // every 10 advertisements
};

new Promise(function(resolve, reject) {
        ngrok.connect(3000, function(err, url) {
            if (err) {
                console.log("## NGROK : Error gate");
                reject(err);
            }
            if (url) {
                console.log("## NGROK : Gate to port 3000 created");
                resolve(url);
            }
        });
    })
    .then(url => {
        console.log("## PROMISE : App available on " + url);
        eddystoneBeacon.advertiseUrl(url, [options]);
    })
    .catch(err => {
        console.log("## PROMISE : " + err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.status(err.status || 500);
    res.send(err);
});


module.exports = app;