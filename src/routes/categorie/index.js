const express = require('express');
const router = express.Router();
const categorieController = require('../../controllers/categorie/categorieController');

router.get('/', categorieController.getAllCategorieProduit);
router.post('/', categorieController.createCategorieProduit);

module.exports = router;