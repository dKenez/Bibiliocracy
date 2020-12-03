const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/i6i283', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
