// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.home = (req, res) => {

    res.render('index.ejs', {
        title: 'Slotgame | Game Page',
        // message: message,
        // data: ''
    });
};

exports.getAllUsers = async (req, res) => {
    User.getAllUsers((error, results) => {
      if(error){
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "There was an error, getting all!"
        });
    }
    return res.status(200).json({
      success: 1,
      data: results,
      message: "Successfull!"
    });
    })
  }
