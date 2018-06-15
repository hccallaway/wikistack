const express = require('express');
const router = express.Router();

const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage')
const main = require('../views/main')

router.get('/', async (req, res, next) => {
  try {
    const allPage = await Page.findAll()
    res.send(main(allPage))
  } catch (error){
      console.error(error)
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const foundPage = await Page.findOne({where: {slug: req.params.slug}})
        res.send(wikiPage(req.body, req.body.name))
    } catch (error) {
        console.error(error)
    }
});

router.post('/', async (req, res, next) => {
    console.log('HERE', req.body)
    const generateSlug = (title) => {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
  try {
    await Page.create(req.body);
    res.redirect(`/wiki/${generateSlug(req.body.title)}`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
