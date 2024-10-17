var express = require('express');
var router = express.Router();

const appdata = require('../data.json')

router.get('/', function(req, res) {
  var artwork = [];
  appdata.speakers.forEach(function(speaker) {
    artwork = artwork.concat(speaker.artwork);
  });
  res.render('speakers', {
    title: 'Express',
    artwork: artwork
  });
});

router.get('/:shortname', (req, res) => {
  const speakerShortName = req.params.shortname

  const currentSpeaker = appdata.speakers.find((speaker) => speaker.shortname === speakerShortName)

  console.log(currentSpeaker);

  res.send(currentSpeaker)
})

module.exports = router;