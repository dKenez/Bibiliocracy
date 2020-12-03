/*
 * Check if email address is valid and if it already exists in the database
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- checkUserCredentialsMW ---');
    if ((typeof req.body.loginType === 'undefined') ||
        (typeof req.body.loginEmail === 'undefined') ||
        (typeof req.body.loginPassword === 'undefined') ||
        (typeof req.body.submitLogin === 'undefined')) {
      return next();
    }

    console.log('executing');
    BibliocratModel.findOne({email:req.body.loginEmail}, (err, bibliocrat) => {
      if (err || !bibliocrat) {
        return next(err);
      }
      // delete req.session.userID;
      // console.log(req.session);

      if (req.body.loginPassword === bibliocrat.password) {
        if(typeof req.session.userID === 'undefined') {
          req.session.userID = bibliocrat._id;
          console.log(req.session.userID);
          return res.redirect('/');
        } else {
          res.locals.loginError = "Már egyszer bejelenteztél!";
          return next();
        }
      }else{
        res.locals.loginError = 'Hibás jelszó!'
        return next();
      }
    });
  };
};
