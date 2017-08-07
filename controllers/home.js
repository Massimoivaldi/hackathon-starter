const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Corso = require('../models/Corso');
const Organizzazione = require('../models/Organizzazione');
const Docente = require('../models/Docente');
const Categoria = require('../models/Categoria');
/**
 * GET /
 * Home page.
 */


exports.index = (req, res) => {
  Corso.find({},(err, docs) => {
    Organizzazione.find({},(err,orga)=>{
      Docente.find({},(err,doce)=>{
      	//console.log(doce);
        Categoria.find({},(err,cate)=>{
          res.render('home', { 
          title: 'Home',
          ogImage: '',
          ogDescription: '',
          docs: docs,
          orga: orga,
          doce: doce,
          cate: cate
          });
        });
      });
    });
  });
};

exports.corsi = (req, res) => {
	Corso.findOne({slug:req.params.slug},(err, docs) => {
	//console.log(docs);
		res.render('corso/corso', { 
		title: 'Corsi',
		ogImage: '',
		ogDescription: '',
		docs: docs
		});
	});
};

exports.docenti = (req, res) => {
	Docente.findOne({slug:req.params.slug},(err, docs) => {
		Corso.find({docente:{$elemMatch:{_iddocente:docs._id}}},(err, corsi) =>{
		//console.log(docs);
			res.render('docente/docente', { 
			title: 'Docenti',
			ogImage: '',
			ogDescription: '',
			docs: docs,
			corsi:corsi
			});
		});
	});
};
