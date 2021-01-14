const express = require('express');
const router = express.Router();
const fs = require("fs")

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index')
});

router.get('/resume', function(req, res, next) {
    var resume="bin/files/Jackson_Lawrence_Resume.pdf";
    fs.readFile(resume, function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;
