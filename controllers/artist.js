const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Artist = require('../models/Artist');

/**
 * GET /artist
 * Description page.
 */
exports.getArtist = (req, res) => {
  console.log(req.session.passport.user);
  Artist.findOne({owner:req.session.passport.user},(err, docs) => {
    console.log(docs.name);
    res.render('artist/artist', { 
      artist: docs ,
      title: 'Artistoide Management',
      owner: req.session.passport.user
    });
  });
};

/**
 * POST /update artist
 * Update page.
 */
exports.updateArtist = (req, res) => {
  console.log(req.body);
  const artist = new Artist({ 
    owner: req.session.passport.user,
    name: req.body.name,
    description: req.body.description
  });
  Artist.find({owner:req.session.passport.user},(err, docs) => {
    var count = docs.length;
    console.log(count);
    if(count>0){
        console.log('numinchiuni');
        Artist.update(
          { owner: req.session.passport.user },
          { name: req.body.name,
            description: req.body.description
          },{ upsert: false },(err)=>{res.redirect('/artist');});

    } else {
      artist.save((err) => {
          res.redirect('/artist');
        }
      )
    }
  });
  
  
};
