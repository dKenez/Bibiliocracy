const BibliocratModel = require('./models/bibliocrat');
const BibModel = require('./models/bib');
const BibdomModel = require('./models/bibdom');

let egyBibliocrat = new BibliocratModel();
egyBibliocrat.username = 'i6i283';
egyBibliocrat.motto = 'Alea iacta es';
egyBibliocrat.age = 20;
egyBibliocrat.gender = 'None of your business';
egyBibliocrat.story = 'Once upon a thyme...';
egyBibliocrat.email = 'test@test.hu';
egyBibliocrat.password = '123';

egyBibliocrat.save((err)=>{
  console.log(err);

});

let egyBib = new BibModel();
egyBib.title = 'Tűz és jég dala';
egyBib.author = 'G.R.R. Martin';
egyBib.ISBN = 14225;
egyBib.blurb = 'Lorem ipsum dolor sit amet..';

egyBib.save((err)=>{
  console.log(err);
});

let ketBib = new BibModel();
ketBib.title = 'Harry Potter';
ketBib.author = 'J.K. Rowling';
ketBib.ISBN = 14226;
ketBib.blurb = 'Lorem ipsum dolor sit amet..';

ketBib.save((err)=>{
  console.log(err);
});

let haromBib = new BibModel();
haromBib.title = 'Silmarillion';
haromBib.author = 'J.R.R. Tolkien';
haromBib.ISBN = 14227;
haromBib.blurb = 'Lorem ipsum dolor sit amet..';

haromBib.save((err)=>{
  console.log(err);
});

let egyBibdom = new BibdomModel();
egyBibdom._bibliocrat = egyBibliocrat;
egyBibdom._bib = egyBib;
egyBibdom.rating = 3;

egyBibdom.save((err)=>{
  console.log(err);
});

let ketBibdom = new BibdomModel();
ketBibdom._bibliocrat = egyBibliocrat;
ketBibdom._bib = ketBib;
ketBibdom.rating = 5;

ketBibdom.save((err)=>{
  console.log(err);
});
