/*
 * Retreive user information by email address
 */

module.exports = function (objectrepository) {

  return function (req, res, next) {
      console.log("getUserByEmailMW still subscribed somewhere mate");
    return next();
  };
};
