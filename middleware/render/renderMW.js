/*
 * Render the .html file in the browser
 */

 module.exports = function(objectrepository, viewName) {
     return function(req, res) {
       console.log('--- renderMW ---')
         res.render(viewName);
     };
 };
