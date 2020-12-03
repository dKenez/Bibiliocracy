const Schema = require('mongoose').Schema;
const db = require('../config/db');

const BibdomSchema = new Schema({
    _bibliocrat: {
      type: Schema.Types.ObjectId,
      ref: 'bibliocrats',
      required: true
    },
    _bib: {
      type: Schema.Types.ObjectId,
      ref: 'bibs',
      required: true
    },
    rating: Number
});

BibdomSchema.index({ _bibliocrat: 1, _bib: 1 }, { unique: true, dropDups: true });

const Bibdom = db.model('Bibdom', BibdomSchema);

module.exports = Bibdom;
