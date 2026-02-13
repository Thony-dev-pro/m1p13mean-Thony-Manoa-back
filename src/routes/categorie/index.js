const express = require('express');
const router = express.Router();
const categorieController = require('../../controllers/categorie/categorieController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { TYPE } = require('../../constant/utilisateur');

router.get('/', categorieController.getAllCategorieProduit);
router.post('/create-categorie', authMiddleware, checkRole([TYPE.ADMIN]), categorieController.createCategorieProduit);
router.put('/update-categorie', authMiddleware, checkRole([TYPE.ADMIN]), categorieController.updateCategorieProduit);

module.exports = router;