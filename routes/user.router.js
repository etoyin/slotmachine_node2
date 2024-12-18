const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { checkToken } = require("../auth/token_validation");
const { createSpins, getAllSpins } = require('../controllers/spinCountController');
const { createVisits, getAllVisits } = require('../controllers/gamePageVisitsController');
const { viewPage, createFundVisits, getWalletBalance } = require('../controllers/fundPageController');
const { viewCreditCardPage, createCreditVisits } = require('../controllers/credit_cardController');
const { viewEmail, verify_email, createEmailClicks } = require('../controllers/emailCountController');
const { createDailyEmailClicks } = require('../controllers/dailyEmailCountController');

router.get('/home', checkToken, userController.home);
router.get('/users', userController.getAllUsers);
router.post('/spin_count', checkToken, createSpins);
router.get('/get_spins', checkToken, getAllSpins);
router.post('/game_page_count', checkToken, createVisits);
router.get('/all_game_page_count', checkToken, getAllVisits);

router.get('/fund_wallet', checkToken, viewPage);
router.post('/track_fund_page', checkToken, createFundVisits);
router.post('/get_wallet_balance', checkToken, getWalletBalance);


router.get('/credit_card', checkToken, viewCreditCardPage);
router.post('/track_credit_card_page', checkToken, createCreditVisits);

router.get('/verify-email', verify_email);
router.post('/email_clicks', checkToken, createEmailClicks );

router.get('/three_spins_win', checkToken, createDailyEmailClicks );

module.exports = router;