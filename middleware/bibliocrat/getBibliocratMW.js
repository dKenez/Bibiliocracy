/*
 * Get the information of the bibliocrat in the url parameter
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- getBibliocratMW ---');

    BibliocratModel.findOne({_id: req.session.userID}, (err, bibliocrat) => {
      if (err) {
        return next(err);
      }

      if (!bibliocrat) {
        return res.redirect('/login');
      }

      res.locals.bibliocrat = {
        username:   bibliocrat.username,
        motto: bibliocrat.motto,
        age: bibliocrat.age,
        gender: bibliocrat.gender,
        story: bibliocrat.story
      };

      return next();
    });
  };
};
