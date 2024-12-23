const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');

const { searchByDate, extractDateFromISOString, countOccurrences } = require('../../middlewares/searchDates');
const { Op } = require('sequelize');
const DailyEmail = require('../../models/Admin/DailyEmail');




exports.getAllDailyEmailClicksByDate = async (req, res) => {
    let body = req.query
    let start = body.start;
    let end = body.end
    let result = await searchByDate(start, end, DailyEmail);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Daily Email Clicks",
        data: r,
        heading: "Daily Email Clicks",
        label: "No of Clicks per day",
        search_url: "/search_daily_email_clicks",
        start, end
    })
}


exports.getAllDailyEmailClicksLast7Days = async (req, res) => {
    let today = new Date();
    let last7days = new Date(today);
    last7days.setDate(today.getDate() - 7);

    today = await extractDateFromISOString(today);
    last7days = await extractDateFromISOString(last7days);

    let result = await searchByDate(last7days, today, DailyEmail);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Daily Email Clicks",
        data: r,
        heading: "Daily Email Clicks",
        label: "No of Clicks per day",
        search_url: "/search_daily_email_clicks",
        start:last7days, end:today
    })
}


exports.getAllDailyEmailClicks = async (req, res) => {
    let allDailyEmailClicks = await DailyEmail.findAll();

    res.json({
        allDailyEmailClicks
    })
}