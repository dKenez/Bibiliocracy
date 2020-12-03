/*
 * Save the information entered into the form to the database
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

  const BibModel = requireOption(objectrepository, 'BibModel');

  return function (req, res, next) {
    console.log('--- saveBibMW ---');
    // console.log(req.body);
    if ((typeof req.body.title === 'undefined') ||
        (typeof req.body.author === 'undefined') ||
        (typeof req.body.ISBN === 'undefined') ||
        (typeof req.body.blurb === 'undefined')) {
          return next();
    }



    BibModel.create({
      title: req.body.title,
      author: req.body.author,
      ISBN: req.body.ISBN,
      blurb: req.body.blurb
    });

    console.log("idemegiromasavet majd bibsav edition");
    // console.log(req.body);
    // console.log(req.file);

    return res.redirect('/')
    };
};
