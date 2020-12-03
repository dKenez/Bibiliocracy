const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');        //se require, se semmi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('static'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  // cookie: {secure: true}  // ezzel nem mukodott
}));

// load routing
require('./routes/routes')(app);

app.use((err, req, res, next) => {
  res.end('Problem...');
  console.log(err);
});

const server = app.listen(3000, function () {
  console.log("On : 3000");
});
