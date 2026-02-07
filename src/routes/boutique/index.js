const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const { TYPE } = require('../../constant/utilisateur');

router.get('/', boutiqueController.getBoutique);
router.post('/register', boutiqueController.register);
router.put('/validate/:userId', authMiddleware , checkRole([TYPE.ADMIN]),boutiqueController.validate);
router.post('/login', boutiqueController.login);

module.exports = router;