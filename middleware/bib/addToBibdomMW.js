/*
 * If user enters wrong password, redirects to login page once again
 */

const requireOption = require('../requireOption');
const mongoose = require('mongoose');

module.exports = function (objectrepository) {

  const BibdomModel = requireOption(objectrepository, 'BibdomModel');
  const BibModel = requireOption(objectrepository, 'BibModel');

  return function (req, res, next) {
    console.log('--- addToBibdomMW ---');
    if (typeof req.body.addBib === 'undefined') {
          return next();
    }

    console.log('executing');

    BibdomModel.create({
      _bibliocrat: mongoose.Types.ObjectId(req.session.userID),
      _bib: mongoose.Types.ObjectId(req.params.bibid)
    }, (err) => {
      if (err) {
        // console.log(`caught the error: ${err}`);
        if (err.name === 'MongoError' && err.code === 11000) {
          res.locals.addError = 'Ez a könyv már a könyvtáradban van!';
          console.log('There was a duplicate key error');
          return next();
        } else {
          return next(err);
        }
      }

      res.locals.numOfBibs += 1;
      return next();
    });
  };
};
