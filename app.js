const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const layout = require('./views/layout');
const { db, Page, User } = require('./models');

// const db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res, next) => {
  res.send(layout());
});

const init = async () => {
  await db.sync({ force: true });
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`listening in on ${PORT}`);
  });
};

init();
