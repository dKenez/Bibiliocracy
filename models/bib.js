const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Bib = db.model('Bib', {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    ISBN: {
      type: String,
      required: true
    },
    blurb: String
});

module.exports = Bib;
