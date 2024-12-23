const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');
const Spin = require('../../models/Admin/Spins');
const { searchByDate, extractDateFromISOString, countOccurrences } = require('../../middlewares/searchDates');
const { Op } = require('sequelize');




exports.getAllSpinsByDate = async (req, res) => {
    let body = req.query
    let start = body.start;
    let end = body.end
    let result = await searchByDate(start, end, Spin);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Number of Spin",
        data: r,
        heading: "Spin Data",
        label: "No of Clicks per day",
        search_url: "/search_spins",
        start, end
    })
}


exports.getAllSpinsLast7Days = async (req, res) => {
    let today = new Date();
    let last7days = new Date(today);
    last7days.setDate(today.getDate() - 7);

    today = await extractDateFromISOString(today);
    last7days = await extractDateFromISOString(last7days);

    let result = await searchByDate(last7days, today, Spin);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Number of Spin",
        data: r,
        heading: "Spin Data",
        label: "No of Clicks per day",
        search_url: "/search_spins",
        start:last7days, end:today
    })
}


exports.getAllSpins = async (req, res) => {
    let allSpins = await Spin.findAll();

    res.json({
        allSpins
    })
}