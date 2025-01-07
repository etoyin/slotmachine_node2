// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const User_Data = require('../models/Admin/User_Data');
require('dotenv').config();

exports.home = (req, res) => {

    res.render('index.ejs', {
        title: 'Slotgame | Game Page',
    });
};

exports.mobile = (req, res) => {

  console.log("Hello");
  
  res.render('index_mobile.ejs', {
      title: 'Slotgame | Game Page',
  });
};

exports.getOneUser = async (req, res) => {
  let id  = req.param.id;

  try {
    const user = await User_Data.findOne({
      where: {
        id,
      },
    });

    if (user) {
      console.log('User found:', user.toJSON()); // Convert to JSON for easy output
      return res.status(200).json({
        success: true,
        message: "Succesful",
        user
      });
    } else {
      console.log('User not found with ID:', userId);
      return res.status(404).json({
        success: false,
        message: "No data",
      });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

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
