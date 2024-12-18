const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();



const { v4 } = require('uuid');
const { create, findByEmail } = require('../../models/Admin/user');

// const {create} = require('../models/user');

// const {createVisits} =  require('../models/user');

exports.index = (req, res) => {
    res.render('admin/dashboard', {
        title: 'Slot Game | Admin Dashboard'
    })
}
