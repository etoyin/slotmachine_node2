const express = require('express');
const router = express.Router();


const { checkToken } = require("../auth/token_validation");
const { login, login_page, createUser, logout } = require('../controllers/Admin/authController');
const { checkAdminToken } = require('../auth/admin_token_validation');
const { index, users } = require('../controllers/Admin/DashboardController');
const { getAllSpins, getAllSpinsByDate, getAllSpinsLast7Days } = require('../controllers/Admin/SpinController');
const { getAllGamePageVisitsLast7Days, getAllGamePageVisitsByDate } = require('../controllers/Admin/GamePageController');
const { getAllDailyEmailClicksLast7Days, getAllDailyEmailClicksByDate } = require('../controllers/Admin/DailyEmailController');
const { getAllVerifiedEmailClicksLast7Days, getAllVerifiedEmailClicksByDate } = require('../controllers/Admin/Verified_email_clicks');
const { getAllCampaignDataLast7Days, getAllCampaignDataByDate } = require('../controllers/Admin/TrafficSourceData');



router.get('/admin_login', login_page);
router.post('/login', login);
router.post('/admin_register', createUser);
router.get('/dashboard', checkAdminToken, index);
router.get('/users_data', checkAdminToken, users);
router.get('/logout', checkAdminToken, logout);

// game_page_visits

router.get('/all_spins', checkAdminToken, getAllSpinsLast7Days);
router.get('/search_spins', checkAdminToken, getAllSpinsByDate);
router.get('/game_page_visits', checkAdminToken, getAllGamePageVisitsLast7Days);
router.get('/search_game_visits', checkAdminToken, getAllGamePageVisitsByDate);

router.get('/daily_email_clicks', checkAdminToken, getAllDailyEmailClicksLast7Days);
router.get('/search_daily_email_clicks', checkAdminToken, getAllDailyEmailClicksByDate);

router.get('/verified_email_clicks', checkAdminToken, getAllVerifiedEmailClicksLast7Days);
router.get('/search_verified_email_clicks', checkAdminToken, getAllVerifiedEmailClicksByDate);

router.get('/traffic_source', checkAdminToken, getAllCampaignDataLast7Days);
router.get('/search_campaign_data', checkAdminToken, getAllCampaignDataByDate);


module.exports = router;