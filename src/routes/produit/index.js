const express = require('express');
const router = express.Router();
const produitController = require('../../controllers/produit/produitController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { TYPE } = require('../../constant/utilisateur');

router.get('/', produitController.getAllProduit);
router.get('/available', produitController.getAvailableProduits);
router.get('/categorie/:categorieId', produitController.getProduitByCategorie);
router.get('/:id', produitController.getProduitById);
router.post('/create-produit', authMiddleware, checkRole([TYPE.BOUTIQUE]), produitController.createProduit);
router.put('/modifier-produit/:id', authMiddleware, checkRole([TYPE.BOUTIQUE]), produitController.updateProduit);

module.exports = router;
