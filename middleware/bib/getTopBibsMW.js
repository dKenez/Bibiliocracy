/*
 * Get a list of highest rated bibs in the database
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibModel = requireOption(objectrepository, 'BibModel');

  return function (req, res, next) {
    console.log('--- getTopBibsMW ---');
    BibModel.find({}, (err, bibs) => {
      if (err) {
        return next(err);
      }

      res.locals.bibs = bibs;
      return next();
    });
  };
};
