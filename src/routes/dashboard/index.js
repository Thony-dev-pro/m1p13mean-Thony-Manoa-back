const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboard/dashboardController');
const authMiddleware = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const { TYPE } = require('../../constant/utilisateur');

router.get('/boutique', authMiddleware, checkRole([TYPE.BOUTIQUE]), dashboardController.dashboardBoutique);
router.get('/admin', authMiddleware, checkRole([TYPE.ADMIN]), dashboardController.dashboardAdmin);

module.exports = router;
