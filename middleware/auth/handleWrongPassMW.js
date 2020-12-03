// DEPRECATED

/*
 * If user enters wrong password, redirects to login page once again
 */

module.exports = function (objectrepository) {

  return function (req, res, next) {
    return next();
  };

};
