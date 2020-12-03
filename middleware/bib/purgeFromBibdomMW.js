// DEPRECATED

/*
 * If user enters wrong password, redirects to login page once again
 */

 const requireOption = require('../requireOption');
 const mongoose = require('mongoose');

module.exports = function (objectrepository) {
  const BibdomModel = requireOption(objectrepository, 'BibdomModel');

  return function (req, res, next) {
    console.log('--- delBibliocratMW ---');
    if (typeof req.body.removeBib === 'undefined') {
          return next();
    }

    console.log('executing');

    console.log(req.body);
    console.log(req.session.userID);
    console.log(req.body.removeBibID);

    BibdomModel.deleteOne({_bibliocrat: req.session.userID,
                        _bib: req.body.removeBibID
    }, (err) => {
      if (err) {
        return next(err);
      }

      res.locals.numOfBibs -= 1;
      return next();
    });
  };

};
