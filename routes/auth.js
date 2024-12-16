const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkToken } = require('../auth/token_validation');

router.get('/', authController.landing);
router.post('/register', authController.createUser);
router.post('/track-visit', authController.createVisits);

router.get('/get_visits', checkToken, authController.getAllVisits);

module.exports = router;