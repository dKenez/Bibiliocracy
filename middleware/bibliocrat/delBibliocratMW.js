/*
 * Delete bibliocrats account
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- delBibliocratMW ---');
    if (typeof req.body.delProfile === 'undefined') {
          return next();
    }

    BibliocratModel.deleteOne({_id: req.session.userID}, (err) => {
      if (err) {
        return next(err);
      }
    });

    req.session.destroy((err) => {
      return res.redirect('/');
    });
  };

};
