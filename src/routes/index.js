const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile')


/* GET home page. */

router.get('/', function(req, res, next) {
    jsonfile.readFile('./bin/json/projects.json', (e,i) => {
        if(e) console.log(e);
        res.render('index', {projects: JSON.stringify(i)})
    })
});

module.exports = router;
