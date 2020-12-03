const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Bibliocrat = db.model('Bibliocrat', {
    username: String,
    motto: String,
    age: Number,
    gender: String,
    story: String,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});

module.exports = Bibliocrat;
