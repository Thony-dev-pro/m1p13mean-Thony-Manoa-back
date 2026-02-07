const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { TYPE } = require('../../constant/utilisateur');

router.post('/register', boutiqueController.register);
router.put('/validate/:userId', authMiddleware , checkRole([TYPE.ADMIN]),boutiqueController.validate);
router.post('/login', boutiqueController.login);
router.get('/', boutiqueController.getAllBoutique);
router.post('/', boutiqueController.createBoutique);
router.put('/modification-info/:id', boutiqueController.modifierInfoBoutique);
router.put('/desactivation/:id', boutiqueController.desactiverCompteBoutique);

module.exports = router;