const express = require('express');
const router = express.Router();

const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('hello');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  try {
    await Page.create(req.body);
    // console.log(newPage);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
