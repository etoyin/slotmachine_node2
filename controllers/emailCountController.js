// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const { findUserId, updateVisit, createVisits } = require('../models/credit_card');
const { sign, verify } = require("jsonwebtoken");
const { getAllEmailClicks, findUserId, updateVisit, createVisits } = require('../models/email_verify');



require('dotenv').config();





exports.verify_email = async (req, res) => {
    let token = req.query.token;
    let email = req.query.email;
    let id = req.query.id;
    verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            res.render('email_verified.ejs', {
                title: 'Slotgame | Verify Email',
                message: 'Your token is either invalid or has expired',
                success: false
            });
        }

        
        const token = sign({ email: email}, process.env.JWT_SECRET,{});
        res.cookie('auth',token);
        res.render('email_verified.ejs', {
            title: 'Slotgame | Verify Email',
            message: 'You are verified',
            success: true,
            data: id
        });
    });
}

exports.getAllEmailClicks = async (req, res) => {
    
    getAllEmailClicks((error, results) => {
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

exports.createEmailClicks = async (req, res) => {
    const body = req.body;
    // body.identifier = v4();
    
  
    findUserId(body.user_id, (error, results) => {
      if(results && results.length){
        let data = results[0];
        updateVisit(data, (err, resu) => {
          if(err){
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "There was an error!"
              });
          }
          return res.status(200).json({
            success: 1,
            data: resu,
            message: "Your Visit has been recorded and added!"
          });
  
        })
      }
      else{
        createVisits(req, (error, results) => {
          if(error){
              console.log(error);
              return res.status(500).json({
                success: 0,
                message: "Database connection error"
              });
          }
          return res.status(200).json({
            success: 1,
            data: results,
            message: "Your visit has been recorded!"
          });
      });
      }
    });
    
}
  
