// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const { findUserId, updateVisit, createVisits } = require('../models/credit_card');
const { sign, verify } = require("jsonwebtoken");
// const { getAllEmailClicks, findUserId, updateVisit, createVisits } = require('../models/email_verify');



require('dotenv').config();

const nodemailer = require('nodemailer');
const { getAllDailyEmailClicks, findUserId, updateVisit, createVisits } = require("../models/daily_email_counts");





exports.verify_email = async (req, res) => {
    // let token = req.query.token;
    let email = req.query.email;
    let id = req.query.id;
        
        const token = sign({ email: email}, process.env.JWT_SECRET,{});
        res.cookie('auth',token);
        res.render('email_verified.ejs', {
            title: 'Slotgame | Verify Email',
            message: 'You are verified',
            success: true,
            data: id
        });
}

exports.getAllDailyEmailClicks = async (req, res) => {
    
    getAllDailyEmailClicks((error, results) => {
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

exports.createDailyEmailClicks = async (req, res) => {

    let email = req.query.email;
    let id = req.query.id;

    const token = sign({ email: email}, process.env.JWT_SECRET,{});
    res.cookie('auth',token);
    // findUserId(id, (error, results) => {
    //   if(results && results.length){
    //     let data = results[0];
    //     updateVisit(data, (err, resu) => {
    //       if(err){
    //           console.log(err);
    //           res.redirect('/');
    //       }
    //       res.redirect('/home?id='+id);
  
    //     })
    //   }
    //   else{
        createVisits(req, (error, results) => {
          if(error){
              console.log(error);
              res.redirect('/');
          }
          res.redirect('/home?id='+id);
      });
    //   }
    // });
    
}
  
