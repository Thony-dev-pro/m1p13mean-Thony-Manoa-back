const express = require('express');
const router = express.Router();
const acheteurController = require('../../controllers/acheteur/acheteurController');

router.get('/', acheteurController.getAcheteur);
router.post('/register', acheteurController.register);

module.exports = router;