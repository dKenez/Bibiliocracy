/*
 * Save the information entered into the form to the database
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- saveBibliocratMW ---');

    if (typeof req.body.saveProfile === 'undefined') {
          return next();
    }

    if (req.body.username === '' && typeof res.locals.user.username === 'undefined') {
      res.locals.changeError = "Válassz felhasználónevet!";
      return next();
    }

    console.log('executing');
    console.log(req.body);

    BibliocratModel.findOne({_id: req.session.userID}, (err, bibliocrat) => {
      if (err || !bibliocrat) {
        return next(err);
      }

      if (typeof req.body.username === 'string' && req.body.username !== '') {
        bibliocrat.username = req.body.username;
      }

      bibliocrat.motto = req.body.motto;
      bibliocrat.age = req.body.age;
      bibliocrat.gender = req.body.gender;
      bibliocrat.story = req.body.story;
      bibliocrat.save();

      console.log('Changes have been saved');
      return res.redirect('/bibliocrat');
    });
  };
};
