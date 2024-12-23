const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
// const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();
const ejs = require('ejs');



const { v4 } = require('uuid');
const { create, findByEmail } = require('../../models/Admin/user');

// const {create} = require('../models/user');

// const {createVisits} =  require('../models/user');

exports.login_page = async (req, res) => {
  let token = req.cookies.admin;
  if(token){
    verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if(error){
        res.render('admin/login.ejs', {
          title: 'Slotgame | Admin Login',
          // message: message,
          // data: ''
        });
        // res.json({
        //   error
        // })
      }else{
        res.redirect('/dashboard');
      }
    })
  }
  else{
    res.render('admin/login.ejs', {
      title: 'Slotgame | Admin Login',
      // message: message,
      // data: ''
    });
  }


  
  // res.json({
  //   hello: "hi"
  // })
}

exports.login = (req, res) => {
  const body = req.body;
  findByEmail(body.email, (error, results) => {
    if(error){
      console.log(error);
    }
    if(!results){
      return res.json({
        success: 0,
        message: "Username does not exist!"
      });
    }
    const passwordCorrect = bcrypt.compareSync(body.password, results[0].password);
   
    if(passwordCorrect){
      
      results[0].password = undefined;
      const token = sign({ email: body.email}, process.env.JWT_SECRET, {
        expiresIn: "100h"
      });
      // const token = sign({ email: body.email}, process.env.JWT_SECRET,{});
      res.cookie('admin',token);
      return res.json({
        success: 1,
        message: "Login successfully",
        genMessage: "LoggedIn",
        admin: true,
        token: token,
        data: results
      });
    }else{
      return res.json({
        success: 0,
        message: "Invalid email or password"
      });
    }
  })
  
}

exports.createUser = async (req, res) => {
  const body = req.body;

  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);

  // const token_email = sign({ email: body.email}, process.env.JWT_SECRET,{expiresIn: '1d'});
  // body.token_email = token_email;

  findByEmail(body.email, (error, results) => {
    if(error){
      console.log(error);
    }
    if(results.length){
      return res.json({
        success: 0,
        message: "Username already exist!",
      });
    }

    else{
      create(body, (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({
            success: 0,
            message: "Database connection error"
            });
        }
        res.json({
            success: 1,
            message: "Registration successful",
        });
      });
    }
  });
  
  
  
}


exports.logout = (req, res) => {
  res.clearCookie('admin');
  return res.redirect('/admin_login');
}


