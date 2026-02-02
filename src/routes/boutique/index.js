const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');

router.get('/', boutiqueController.getBoutique);
router.post('/register', boutiqueController.register);

module.exports = router;