const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');

const { searchByDate, extractDateFromISOString, countOccurrences } = require('../../middlewares/searchDates');
const { Op } = require('sequelize');
// const DailyEmail = require('../../models/Admin/DailyEmail');
const Campaign = require('../../models/Admin/Campaign');




exports.getAllCampaignDataByDate = async (req, res) => {
    let body = req.query
    let start = body.start;
    let end = body.end
    let result = await searchByDate(start, end, Campaign);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Traffic Source Data",
        data: r,
        heading: "Traffic Source Data",
        label: "No of generated traffic per day",
        search_url: "/search_campaign_data",
        start, end
    })
}


exports.getAllCampaignDataLast7Days = async (req, res) => {
    let today = new Date();
    let last7days = new Date(today);
    last7days.setDate(today.getDate() - 7);

    today = await extractDateFromISOString(today);
    last7days = await extractDateFromISOString(last7days);

    let result = await searchByDate(last7days, today, Campaign);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Traffic Source Data",
        data: r,
        heading: "Traffic Source Data",
        label: "No of generated traffic per day",
        search_url: "/search_campaign_data",
        start:last7days, end:today
    })
}


exports.getAllCampaignData = async (req, res) => {
    let allCampaignData = await Campaign.findAll();

    res.json({
        allCampaignData
    })
}