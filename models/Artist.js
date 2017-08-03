const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  owner : String,
  name: String,
  picture: String,
  description: String
}, { timestamps: true });


const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
