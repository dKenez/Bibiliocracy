// TODO:

/*
 * Get a list of bibs in the bibliocrats library
 */

const requireOption = require('../requireOption');
const mongoose = require('mongoose');

module.exports = function (objectrepository) {

  const BibdomModel = requireOption(objectrepository, 'BibdomModel');
  const BibModel = requireOption(objectrepository, 'BibModel');

  return function (req, res, next) {
    console.log('--- getBibsMW ---');
    res.locals.bibs = [];

    BibdomModel.aggregate(
      [
        {
          '$lookup': {
            'from': 'bibs',
            'localField': '_bib',
            'foreignField': '_id',
            'as': 'bib'
          }
        },
        {"$match": {'_bibliocrat': mongoose.Types.ObjectId(req.session.userID)}},
        {"$unwind":"$bib"}
      ], (err, docs) => {
      if (err) {
        return next(err);
      }

      docs.map((doc) => {res.locals.bibs.push(doc.bib)});
      // console.log(res.locals.bibs);
      return next();
    });
  };
};
