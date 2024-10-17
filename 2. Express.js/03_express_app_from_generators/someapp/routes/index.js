var express = require('express');
var router = express.Router();

var appdata = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  let artwork = []

  appdata.speakers.forEach(speaker => {
    artwork = artwork.concat(speaker.artwork);
  })

  res.render('index', {
    title: 'Express',
    artwork: artwork
  });
});

module.exports = router;
