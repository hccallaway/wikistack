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
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
