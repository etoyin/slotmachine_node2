const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');

const { searchByDate, extractDateFromISOString, countOccurrences } = require('../../middlewares/searchDates');
const { Op } = require('sequelize');
const GamePage = require('../../models/Admin/GamePage');




exports.getAllGamePageVisitsByDate = async (req, res) => {
    let body = req.query
    let start = body.start;
    let end = body.end
    let result = await searchByDate(start, end, GamePage);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Game Page Visits",
        data: r,
        heading: "Game Page Visits",
        label: "No of Visits per day",
        search_url: "/search_game_visits",
        start, end
    })
}


exports.getAllGamePageVisitsLast7Days = async (req, res) => {
    let today = new Date();
    let last7days = new Date(today);
    last7days.setDate(today.getDate() - 7);

    today = await extractDateFromISOString(today);
    last7days = await extractDateFromISOString(last7days);

    let result = await searchByDate(last7days, today, GamePage);
    let r = result.map(each => {
        return extractDateFromISOString(each.createdAt)
    });

    r = countOccurrences(r)
    res.render('admin/data_display',{
        title: "SlotGame | Game Page Visits",
        data: r,
        heading: "Game Page Visits",
        label: "No of Visits per day",
        search_url: "/search_game_visits",
        start:last7days, end:today
    })
}


exports.getAllGamePageVisits = async (req, res) => {
    let allGamePageVisits = await GamePage.findAll();

    res.json({
        allGamePageVisits
    })
}