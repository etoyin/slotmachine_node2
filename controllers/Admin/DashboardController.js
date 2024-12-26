const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');
const { create, findByEmail } = require('../../models/Admin/user');
// const { getAllUsersData } = require('../../models/Admin/UserData1');
const User_Data = require('../../models/Admin/User_Data');
const Campaign = require('../../models/Admin/Campaign');
const Spin = require('../../models/Admin/Spins');
const GamePage = require('../../models/Admin/GamePage');
const Fundpage = require('../../models/Admin/FundPage');
const EmailVerification = require('../../models/Admin/EmailVerification');
const DailyEmail = require('../../models/Admin/DailyEmail');
const CreditCard = require('../../models/Admin/CreditCard');

// const {create} = require('../models/user');

// const {createVisits} =  require('../models/user');

exports.index = (req, res) => {
    res.render('admin/dashboard', {
        title: 'Slot Game | Admin Dashboard'
    })
}

async function getUsersWithPosts() {
    const users = await User_Data.findAll({
        include: []
    });
    return users;
    // return users.map(user => ({
    //     id: user.id,
    //     email: user.email,
    //     password: "",
    //     verified:user.verified,
    //     verify_token: user.verify_token,
    //     campaign: user.Campaign && user.Campaign.map(camp => ({
    //         id: camp.id,
    //         camp_id: camp.camp_id,
    //         email: user.email,
    //         number: camp.number
    //     }))
    // }));
}

async function getUsersWithSpins() {
    const users = await User_Data.findAll({
        include: [
            {
                model: Spin,
                attributes: ['id', 'user_id', 'number']
            },
            {
                model: GamePage,
                attributes: ['id', 'user_id', 'number']
            },
            {
                model: Fundpage,
                attributes: ['id', 'user_id', 'number']
            },
            {
                model: EmailVerification,
                attributes: ['id', 'user_id', 'number']
            },
            {
                model: CreditCard,
                attributes: ['id', 'user_id', 'number']
            },

            {
                model: DailyEmail,
                attributes: ['id', 'user_id', 'number']
            },
            {
                model: Campaign,
                attributes: ['id', 'user_id', 'email', 'camp_id', 'number']
            }
        ]
    });
    return users;
}

exports.users = (req, res) => {
    
    
    getUsersWithSpins().then(users => {
        // console.log(JSON.stringify(users, null, 2));
        // res.json({
        //     users
        // })
        res.render('admin/users_data', {
            title: 'Slot Game | Users Data',
            data: users
        })
    });
    // getAllUsersData((error, results) => {
    //     if(error){
    //         console.log(error);

            
    //     }
    //     else{
    //         res.json(/*'admin/users_data',*/ {
    //             title: 'Slot Game | Users Data',
    //             data: results
    //         })
    //     }
    // })
}