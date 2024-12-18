const express = require('express');
const router = express.Router();


const { checkToken } = require("../auth/token_validation");
const { login, login_page, createUser } = require('../controllers/Admin/authController');
const { checkAdminToken } = require('../auth/admin_token_validation');
const { index } = require('../controllers/Admin/DashboardController');



router.get('/admin_login', login_page);
router.post('/login', login);
router.post('/admin_register', createUser);
router.get('/dashboard', checkAdminToken, index);



module.exports = router;