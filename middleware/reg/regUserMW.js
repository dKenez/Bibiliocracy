/*
 * Save the information of the new user to the database, send confirmation email
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibliocratModel = requireOption(objectrepository, 'BibliocratModel');

  return function (req, res, next) {
    console.log('--- regUserMW ---');
    if ((typeof req.body.loginType === 'undefined') ||
        (typeof req.body.registerEmail === 'undefined') ||
        (typeof req.body.registerPassword === 'undefined') ||
        (typeof req.body.registerConfirmPassword === 'undefined') ||
        (typeof req.body.submitReg === 'undefined')) {
      return next();
    }
    console.log('executing');

    BibliocratModel.findOne({email: req.body.registerEmail}, (err, bibliocrat) => {
      if (err) {
        console.log("no instance mate");
        return next(err);
      }

      if (bibliocrat) {
        res.locals.regError = "Ezzel az email címmel már van regisztrált felhasználó";
        return next();
      }
      else {
        if(req.body.registerPassword !== req.body.registerConfirmPassword) {
          res.locals.regError = 'A két jelszó nem egyezik!'
          return next();
        }
        else {
          newUser = new BibliocratModel({
            email: req.body.registerEmail,
            password: req.body.registerPassword
          });

          const newUserPromise = newUser.save();

          newUserPromise.then((doc) => {
            doc._id
            if(typeof req.session.userID === 'undefined') {
              req.session.userID = doc._id;
              req.session.setupAccount = true;
              return res.redirect('/bibliocrat/edit');
            }
            else {
              res.locals.loginError = "Session ain't undefined ye absolute bellend";
              return next();
            }
          });
        };
      }
    });
  };
};
