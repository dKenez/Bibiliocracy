// DONE

/*
 * If the user is not logged in, redirects to /
 */

const requireOption = require('../requireOption');
const mongoose = require('mongoose');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');
  const BibdomModel = requireOption(objectrepository, 'BibdomModel');

  return function (req, res, next) {
    console.log('--- authMW ---');
    // console.log(req.body);

    if(typeof req.session.userID !== 'undefined') {
      BibliocratModel.findOne({_id: req.session.userID}, (err, bibliocrat) => {
        if (err || !bibliocrat) {
          return next(err);
        }

        res.locals.user = bibliocrat;
        // BibdomModel.aggregate(
        //   [
        //     {'$match': {'_bibliocrat': mongoose.Types.ObjectId(req.session.userID)}},
        //     {'$count': 'numOfBibs'}
        //   ], (err, return_object) => {
        //   if (err) {
        //     return next(err);
        //   }

        BibdomModel.countDocuments(
          {
            '_bibliocrat': mongoose.Types.ObjectId(req.session.userID)
          }, (err, result) => {
          if (err) {
            return next(err);
          }

          // console.log(result);
          res.locals.numOfBibs = result;

          if(typeof bibliocrat.username === 'undefined' && req.originalUrl !== '/bibliocrat/edit') {
            console.log('redirect');
            return res.redirect('/bibliocrat/edit');
          }
          return next();
        });
      });
    }
    else {
      return next();
    }
  };
};
