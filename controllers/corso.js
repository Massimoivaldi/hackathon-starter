const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Corso = require('../models/Corso');
const Organizzazione = require('../models/Organizzazione');
const Docente = require('../models/Docente');
const Categoria = require('../models/Categoria');


exports.formOrganizzazione = (req, res) => {
  console.log(req.session.passport.user);
  res.render('organizzazione/admin/organizzazione_form', { 
      title: 'Organizzazione',
      owner: req.session.passport.user
    });
};

exports.insertOrganizzazione = (req, res) => {
  console.log(req.body);
  
  const organizzazione = new Organizzazione({ 
    nome: req.body.nome,
    img  : req.body.img,
    icon: req.body.icon,
    excerpt: req.body.excerpt,
    description : req.body.description
  });
  organizzazione.save((err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/organizzazione_list');}
  });
};

exports.updateOrganizzazione = (req, res) => {
  console.log(req.body);
  
  Organizzazione.update({ _id: req.body.id }, { $set: { nome: req.body.nome,
                                                        img  : req.body.img,
                                                        icon: req.body.icon,
                                                        excerpt: req.body.excerpt,
                                                        description : req.body.description 
                                                      }},(err) => {
    if(err){console.log(err);}
    else {
      Corso.update({organizzazione:{$elemMatch:{_idorg:req.body.id}}},{ $set: { "organizzazione.$.nome" : req.body.nome, "organizzazione.$.img": req.body.nome , "organizzazione.$.excerpt": req.body.excerpt}},(err) =>{
        res.redirect('/admin/organizzazione_list');
      })
    }
  });
};

exports.listOrganizzazione = (req, res) => {
  Organizzazione.find({},(err, docs) => {
    console.log(docs)
    res.render('organizzazione/admin/organizzazione_list', { 
      title: 'Lista organizzazioni',
      docs: docs
    });
  });
};

exports.deleteOrganizzazione = (req, res) => {
  console.log('Request Id:', req.params.id);
  Organizzazione.remove({"_id": req.params.id},(err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/organizzazione_list');}
  });
};

exports.editOrganizzazione = (req, res) => {
  console.log('Request Id:', req.params.id);
  Organizzazione.findOne({"_id": req.params.id},(err, docs) => {
    if(err){console.log(err);}
    else {
      console.log(docs);
      res.render('organizzazione/admin/organizzazione_edit', { 
      title: 'edit organizzazioni',
      docs: docs
      });
    }
  });
};

//------------------------------------------------------------------------------------

exports.formDocente = (req, res) => {
  console.log(req.session.passport.user);
  res.render('docente/admin/docente_form', { 
      title: 'Docente',
      owner: req.session.passport.user
    });
};

exports.insertDocente = (req, res) => {
  console.log(req.body);
  
  const docente = new Docente({ 
    nome: req.body.nome,
    img  : req.body.img,
    icon: req.body.icon,
    excerpt: req.body.excerpt,
    description : req.body.description
  });
  docente.save((err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/docente_list');}
  });
};

exports.updateDocente = (req, res) => {
  console.log(req.body);
  
  Docente.update({ _id: req.body.id }, { $set: { nome: req.body.nome,
                                                        img  : req.body.img,
                                                        icon: req.body.icon,
                                                        excerpt: req.body.excerpt,
                                                        description : req.body.description 
                                                      }},(err) => {
    if(err){console.log(err);}
    else {
      Corso.update({docente:{$elemMatch:{_iddocente:req.body.id}}},{ $set: { "docente.$.nome" : req.body.nome, "docente.$.img": req.body.nome , "docente.$.excerpt": req.body.excerpt}},(err) =>{
        res.redirect('/admin/docente_list');
      });
    };
  });
};

exports.listDocente = (req, res) => {
  Docente.find({},(err, docs) => {
    console.log(docs)
    res.render('docente/admin/docente_list', { 
      title: 'Lista docenti',
      docs: docs
    });
  });
};

exports.deleteDocente = (req, res) => {
  console.log('Request Id:', req.params.id);
  Docente.remove({"_id": req.params.id},(err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/docente_list');}
  });
};

exports.editDocente = (req, res) => {
  console.log('Request Id:', req.params.id);
  Docente.findOne({"_id": req.params.id},(err, docs) => {
    if(err){console.log(err);}
    else {
      console.log(docs);
      res.render('docente/admin/docente_edit', { 
      title: 'edit docenti',
      docs: docs
      });
    }
  });
};

//------------------------------------------------------------------------------------

exports.formCategoria = (req, res) => {
  console.log(req.session.passport.user);
  res.render('categoria/admin/categoria_form', { 
      title: 'Categoria',
      owner: req.session.passport.user
    });
};

exports.insertCategoria = (req, res) => {
  console.log(req.body);
  
  const categoria = new Categoria({ 
    nome: req.body.nome,
    img  : req.body.img,
    icon: req.body.icon,
    excerpt: req.body.excerpt,
    description : req.body.description
  });
  categoria.save((err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/categoria_list');}
  });
};

exports.updateCategoria = (req, res) => {
  console.log(req.body);
  
  Categoria.update({ _id: req.body.id }, { $set: { nome: req.body.nome,
                                                        img  : req.body.img,
                                                        icon: req.body.icon,
                                                        excerpt: req.body.excerpt,
                                                        description : req.body.description 
                                                      }},(err) => {
    if(err){console.log(err);}
    else {
      Corso.update({categoria:{$elemMatch:{_idcategoria:req.body.id}}},{ $set: { "categoria.$.nome" : req.body.nome, "categoria.$.img": req.body.nome , "categoria.$.excerpt": req.body.excerpt}},(err) =>{
        res.redirect('/admin/categoria_list');
      });
    };
  });
};

exports.listCategoria = (req, res) => {
  Categoria.find({},(err, docs) => {
    console.log(docs)
    res.render('categoria/admin/categoria_list', { 
      title: 'Lista categorie',
      docs: docs
    });
  });
};

exports.deleteCategoria = (req, res) => {
  console.log('Request Id:', req.params.id);
  Categoria.remove({"_id": req.params.id},(err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/Categoria_list');}
  });
};

exports.editCategoria = (req, res) => {
  console.log('Request Id:', req.params.id);
  Categoria.findOne({"_id": req.params.id},(err, docs) => {
    if(err){console.log(err);}
    else {
      console.log(docs);
      res.render('categoria/admin/categoria_edit', { 
      title: 'edit categorie',
      docs: docs
      });
    }
  });
};

//--------------------------------------------------------------------


exports.formCorso = (req, res) => {
  console.log(req.session.passport.user);
  res.render('corso/admin/corso_form', { 
      title: 'Corso',
    });
};

exports.insertCorso = (req, res) => {
  console.log(req.body);
  
  const corso = new Corso({ 
    nome: req.body.nome,
    img  : req.body.img,
    icon: req.body.icon,
    excerpt: req.body.excerpt,
    description : req.body.description
  });
  corso.save((err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/corso_list');}
  });
};

exports.updateCorso = (req, res) => {
  console.log(req.body);
  
  Corso.update({ _id: req.body.id }, { $set: { nome: req.body.nome,
                                                        img  : req.body.img,
                                                        icon: req.body.icon,
                                                        excerpt: req.body.excerpt,
                                                        description : req.body.description 
                                                      }},(err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/corso_list');}
  });
};

exports.listCorso = (req, res) => {
  Corso.find({},(err, docs) => {
    console.log(docs)
    res.render('corso/admin/corso_list', { 
      title: 'Lista corsi',
      docs: docs
    });
  });
};

exports.deleteCorso = (req, res) => {
  console.log('Request Id:', req.params.id);
  Corso.remove({"_id": req.params.id},(err) => {
    if(err){console.log(err);}
    else {res.redirect('/admin/corso_list');}
  });
};


// https://stackoverflow.com/questions/6180896/how-to-return-mongoose-results-from-the-find-method
exports.editCorso= (req, res) => {
  Corso.findOne({"_id": req.params.id},(err, docs) => {
  console.log(docs);
    Organizzazione.find({},(err,orga)=>{
      Docente.find({},(err,doce)=>{
        Categoria.find({},(err,cate)=>{
          res.render('corso/admin/corso_edit', { 
          title: 'edit corsi',
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

//------------------------------------------------------------------------
exports.ajaxAddOrganizzazione = (req, res) => {
  //console.log(req.body);
  Organizzazione.findOne({_id:req.body.id},(err,orga)=>{
  //console.log(orga);
    Corso.findOne({_id:req.body.corsoId,organizzazione:{$elemMatch:{nome:orga.nome}}},(err,kurz)=>{
    //console.log(kurz);
      if(kurz == null) {
        Corso.update({_id:req.body.corsoId},{$addToSet:{organizzazione:{_idorg:orga._id,nome:orga.nome,img:orga.img,excerpt:orga.excerpt}}},(err) => {
        res.send(orga);
        });
      } else {res.send('no');}
    });
  });
};
exports.ajaxAddDocente = (req, res) => {
  //console.log(req.body);
  Docente.findOne({_id:req.body.id},(err,docente)=>{
  console.log(docente);
    Corso.findOne({_id:req.body.corsoId,docente:{$elemMatch:{nome:docente.nome}}},(err,doc)=>{
    //console.log(kurz);
      if(doc == null) {
        Corso.update({_id:req.body.corsoId},{$addToSet:{docente:{_iddocente:docente._id,nome:docente.nome,img:docente.img,excerpt:docente.excerpt}}},(err) => {
        res.send(docente);
        });
      } else {res.send('no');}
    });
  });
};

exports.ajaxAddCategoria = (req, res) => {
  //console.log(req.body);
  Categoria.findOne({_id:req.body.id},(err,cate)=>{
  //console.log(orga);
    Corso.findOne({_id:req.body.corsoId,categoria:{$elemMatch:{nome:cate.nome}}},(err,doc)=>{
    //console.log(kurz);
      if(doc == null) {
        Corso.update({_id:req.body.corsoId},{$addToSet:{categoria:{_idcategoria:cate._id,nome:cate.nome,img:cate.img,excerpt:cate.excerpt}}},(err) => {
        res.send(cate);
        });
      } else {res.send('no');}
    });
  });
};
//------------------------------------------------------------------------

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
