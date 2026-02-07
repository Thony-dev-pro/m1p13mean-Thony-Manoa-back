const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');

router.get('/', boutiqueController.getAllBoutique);
router.post('/', boutiqueController.createBoutique);
router.put('/modification-info/:id', boutiqueController.modifierInfoBoutique);
router.put('/desactivation/:id', boutiqueController.desactiverCompteBoutique);

module.exports = router;