const express = require('express');
const router = express.Router();
const produitController = require('../../controllers/produit/produitController');
const stockController =  require('../../controllers/stock/stockController')
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const upload = require("../../middleware/upload");
const { TYPE } = require('../../constant/utilisateur');

router.get('/', produitController.getAllProduit);

router.get('/search', produitController.searchProduits);

router.get('/mouvements-stock', authMiddleware, checkRole([TYPE.BOUTIQUE]), stockController.getMouvementStock);

router.get('/available', produitController.getAvailableProduits);
router.get('/categorie/:categorieId', produitController.getProduitByCategorie);
router.get('/:id', produitController.getProduitById);
router.post('/create-produit', authMiddleware, checkRole([TYPE.BOUTIQUE]), upload.single('image'), produitController.createProduit);
router.put('/modifier-produit/:id', authMiddleware, checkRole([TYPE.BOUTIQUE]), upload.single('image'), produitController.updateProduit);
router.post('/ajoutStock', authMiddleware, checkRole([TYPE.BOUTIQUE]), stockController.ajoutStock);


module.exports = router;
