/*
 * Send a password reset email to users email address
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- sendPwMW ---');
    if ((typeof req.body.loginType === 'undefined') ||
        (typeof req.body.loginEmail === 'undefined') ||
        (typeof req.body.loginPassword === 'undefined') ||
        (typeof req.body.forgotPW === 'undefined')) {
      return next();
    }

    console.log('executing');

    console.log(req.body);

    BibliocratModel.findOne({email: req.body.loginEmail}, (err, bibliocrat) => {
      if (err || !bibliocrat) {
        return next(err);
      }

      bibliocrat.password = 'password';
      bibliocrat.save();

      res.locals.loginInfo = 'A jelszavad vissza lett állítva!'
      console.log('your new password is "password"');
      return next();
    });
  };
};
