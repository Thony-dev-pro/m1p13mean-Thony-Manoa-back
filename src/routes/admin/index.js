const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const acheteurController = require('../../controllers/acheteur/acheteurController');
const authMiddleware = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const { TYPE } = require('../../constant/utilisateur');

router.get('/', adminController.getAdmin);
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/liste-acheteurs', authMiddleware , checkRole([TYPE.ADMIN]), adminController.getListeAcheteur);

module.exports = router;