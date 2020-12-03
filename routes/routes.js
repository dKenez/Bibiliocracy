const renderMW = require('../middleware/render/renderMW.js');

const handleWrongPassMW = require('../middleware/auth/handleWrongPassMW.js');
const authMW = require('../middleware/auth/authMW.js');

const getUserByEmailMW = require('../middleware/reg/getUserByEmailMW.js');
const checkUserCredentialsMW = require('../middleware/reg/checkUserCredentialsMW.js');
const logoutMW = require('../middleware/reg/logoutMW.js');
const sendPwMW = require('../middleware/reg/sendPwMW.js');
const regUserMW = require('../middleware/reg/regUserMW.js');

const saveBibliocratMW = require('../middleware/bibliocrat/saveBibliocratMW.js');
const getBibliocratMW = require('../middleware/bibliocrat/getBibliocratMW.js');
const delBibliocratMW = require('../middleware/bibliocrat/delBibliocratMW.js');

const getTopBibsMW = require('../middleware/bib/getTopBibsMW.js');
const getBibsMW = require('../middleware/bib/getBibsMW.js');
const getBibMW = require('../middleware/bib/getBibMW.js');
const saveBibMW = require('../middleware/bib/saveBibMW.js');
const addToBibdomMW = require('../middleware/bib/addToBibdomMW.js');
const purgeFromBibdomMW = require('../middleware/bib/purgeFromBibdomMW.js');

// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });

const BibModel = require('../models/bib');
const BibdomModel = require('../models/bibdom');
const BibliocratModel = require('../models/bibliocrat');

module.exports = function (app) {

  const objectRepository = {
    /*
     * Ide kerülnek az objectRepository dolgai
     */

     BibModel: BibModel,
     BibdomModel: BibdomModel,
     BibliocratModel: BibliocratModel
  };

  app.get('/?hiba=loginerror',
    getTopBibsMW(objectRepository),
    renderMW(objectRepository, 'index')
  );

  app.use('/login',
    authMW(objectRepository),
    getUserByEmailMW(objectRepository),
    checkUserCredentialsMW(objectRepository),
    sendPwMW(objectRepository),
    regUserMW(objectRepository),
    renderMW(objectRepository, 'login')
  );

  app.get('/logout',
    logoutMW(objectRepository)
  );

  // app.use('/sendmepassword',
  //   getUserByEmailMW(objectRepository),
  //   sendPwMW(objectRepository),
  //   renderMW(objectRepository, 'login')
  // );

  // app.use('/reg',
  //   regUserMW(objectRepository),
  //   renderMW(objectRepository, 'login')
  // );

  // app.use('/bibliocrat/new',
  //   authMW(objectRepository),
  //   saveBibliocratMW(objectRepository),
  //   renderMW(objectRepository, 'login')
  // );

  app.use('/bibliocrat/edit',
    authMW(objectRepository),
    getBibliocratMW(objectRepository),
    saveBibliocratMW(objectRepository),
    delBibliocratMW(objectRepository),
    renderMW(objectRepository, 'account_modification')
  );

  // app.get('/bibliocrat/del/:bibliocratid',
  //   authMW(objectRepository),
  //   getBibliocratMW(objectRepository),
  //   delBibliocratMW(objectRepository)
  // );

  app.use('/bibliocrat',
    authMW(objectRepository),
    getBibliocratMW(objectRepository),
    purgeFromBibdomMW(objectRepository),
    getBibsMW(objectRepository),
    renderMW(objectRepository, 'bibliocrat')
  );

  app.use('/bib/new',
    authMW(objectRepository),
    // upload.single('cover'),
    saveBibMW(objectRepository),
    renderMW(objectRepository, 'bib_genesis')
  );

  // app.use('/bib/edit/:bibid',
  //   authMW(objectRepository),
  //   getBibMW(objectRepository),
  //   saveBibMW(objectRepository),
  //   renderMW(objectRepository, 'bib_genesis')
  // );

  app.use('/bib/:bibid',
    authMW(objectRepository),
    getBibMW(objectRepository),
    addToBibdomMW(objectRepository),
    renderMW(objectRepository, 'bib')
  );

  app.get('/',
    authMW(objectRepository),
    getTopBibsMW(objectRepository),
    renderMW(objectRepository, 'index')
  );

};
