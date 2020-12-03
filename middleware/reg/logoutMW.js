/*
 * logout user from session
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  return function (req, res, next) {
    console.log('--- checkUserCredentialsMW ---');

    req.session.destroy((err) => {
      return res.redirect('/login');
    });

    // if(typeof req.session.userID === 'undefined') {
    //   console.log("Session is already undefined ye absolute bellend");
    //   return res.redirect('/');;
    // } else {
    //   delete req.session.userID;
    // }
    //
    // return res.redirect('/login');
  };
};
