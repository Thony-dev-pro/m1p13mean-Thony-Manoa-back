const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/teste/articleController');

router.get('/', articleController.getAllArticles);

module.exports = router;