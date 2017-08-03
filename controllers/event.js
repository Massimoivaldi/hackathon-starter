const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Event = require('../models/Event');


exports.getEvent = (req, res) => {
  console.log(req.session.passport.user);
  console.log(req.session);
  var locations = [
      {
        location: 'Fremont',
        latitude: 37.49267,
        longitude: -121.94409
      },
      {
        location: 'Folsom',
        latitude: 38.64392,
        longitude: -121.18621
      },
      {
        location: 'Gilroy',
        latitude: 37.02615,
        longitude: -121.56487
      }]
  //console.log(locations);
  Event.find({owner:req.session.passport.user},(err, docs) => {
    //console.log(docs)
    res.render('event/event', { 
      title: 'Artistoide Management',
      owner: req.session.passport.user,
      locations: docs
    });
  });
};


exports.insertEvent = (req, res) => {
  //console.log(req.body);
  const event = new Event({ 
    owner: req.body.owner,
    geo  : { title:req.body.title , lat:req.body.lat , lng: req.body.lng},
    description: req.body.description,
    starring: req.body.starring,
    date : new Date().toLocaleString()
  });
  event.save((err) => {
    if(err){console.log(err);}
    else {res.redirect('/event');}
  });
};
