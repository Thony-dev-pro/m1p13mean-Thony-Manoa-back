const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { TYPE } = require('../../constant/utilisateur');

router.post('/register', boutiqueController.register);
router.put('/validate/:userId', authMiddleware , checkRole([TYPE.ADMIN]),boutiqueController.validate);
router.post('/login', boutiqueController.login);
router.get('/liste-boutique', authMiddleware , checkRole([TYPE.ADMIN]),boutiqueController.getListeBoutique);
router.get('/mes-produits', authMiddleware, checkRole([TYPE.BOUTIQUE]), boutiqueController.getMesProduits);
router.put('/modification-info/:id', boutiqueController.modifierInfoBoutique);
router.put('/desactivation/:id', boutiqueController.desactiverCompteBoutique);

module.exports = router;