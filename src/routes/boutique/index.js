const express = require('express');
const router = express.Router();
const boutiqueController = require('../../controllers/boutique/boutiqueController');

router.get('/', boutiqueController.getBoutique);
router.post('/register', boutiqueController.register);
router.put('/validate/:userId', boutiqueController.validate);
router.post('/login', boutiqueController.login);

module.exports = router;