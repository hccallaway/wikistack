const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

// const db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  await db.sync();
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`listening in on ${PORT}`);
  });
};

init();
