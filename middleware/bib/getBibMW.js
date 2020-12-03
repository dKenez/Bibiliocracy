// TODO

/*
 * Get the information of the bib in the url parameter
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibModel = requireOption(objectrepository, 'BibModel');

  return function (req, res, next) {
    BibModel.findOne({_id: req.params.bibid}, (err, bib) => {
      if (err || !bib) {
        return next(err);
      }

      res.locals.bib = bib;
      return next();
    });
  };
};
