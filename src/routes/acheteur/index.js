const express = require('express');
const router = express.Router();
const acheteurController = require('../../controllers/acheteur/acheteurController');

router.get('/', acheteurController.getAcheteur);

module.exports = router;