const express = require('express');
const router = express.Router();
const commandeController = require('../../controllers/commande/commandeController');
const authMiddleware = require("../../middleware/auth");
const checkRole = require("../../middleware/checkRole");
const {TYPE} = require("../../constant/utilisateur");

router.post('/',authMiddleware , checkRole([TYPE.ACHETEUR]), commandeController.createCommande);
router.put('/validate/:commandeId', authMiddleware , checkRole([TYPE.BOUTIQUE]), commandeController.validateCommande);
router.put('/cancel/:commandeId', authMiddleware , checkRole([TYPE.BOUTIQUE]), commandeController.cancelCommande);

module.exports = router;