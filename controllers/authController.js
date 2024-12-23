const bcrypt = require('bcryptjs');
const {sign, verify} = require('jsonwebtoken');
const User = require('../models/user');
var cookieParser = require('cookie-parser')
require('dotenv').config();
const ejs = require('ejs');



const { v4 } = require('uuid');

const {create} = require('../models/user');

const {createVisits} =  require('../models/user');

exports.getAllVisits = async (req, res) => {
  User.findAllIdentifier((error, results) => {
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
    message: "Successful!"
  });
  })
}

exports.createVisits = async (req, res) => {
  const body = req.body;
  body.identifier = v4();

  User.findIdentifier(body.identifier, (error, results) => {
    if(results && results.length){
      let data = results[0];
      User.updateIdentifier(data, (err, resu) => {
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
          message: "Your visit has been recorded and added!"
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
let base_url = process.env.BASE_URL;
exports.landing = (req, res) => {

  let reqq = {
    body:{
      email: req.query.email,
      camp_id: req.query.camp
    }
  };
  let errorCheck = false;
  if(req.query.camp){
    findCampId(req.query.camp, (error, results) => {
      if(results && results.length){
        let data = results[0];
        if(req.query.email){
          data.email = req.query.email
        }
        updateVisit(data, (err, resu) => {
          if(err){
              errorCheck = true;
              console.log(err);
              return res.status(500).json({
                success: 0,
                message: "There was an error!"
              });
          } 
        })
      }
      else{
        createVisit(reqq, (error, results) => {
          if(error){
              errorCheck = true;
              console.log(error);
              return res.status(500).json({
                success: 0,
                message: "Database connection error"
              });
          }
      });
      }
  
    });  
    if(errorCheck) {
      return
    };
    console.log(errorCheck);
  }
  if(req.query.email){
    User.findByEmail(req.query.email, (error, results) => {
      if(results && results.length){
        console.log("ëmail found");
        const token = sign({ email: reqq.body.email}, process.env.JWT_SECRET,{});
        res.cookie('auth',token);
        // console.log('got here!');
        
        res.redirect('/home?id='+results[0].id);
        
      }
      else{
        console.log("ëmail not found");
        // a separate function created for the add link so that we can redirect the user back to the home page
        this.createUserFromAd(reqq, res);
      }
    })
  }
  else{
    console.log(process.env.BASE_URL)
    let token = req.cookies.auth;
    if(token){
      verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
          res.render('landing.ejs', {
              title: 'Slotgame | Landing Page',
              // message: message,
              // data: ''
          });
          // res.json({
          //   error
          // })
        }else{
          res.redirect('/home');
        }
      })
    }
    else{
      res.render('landing.ejs', {
        title: 'Slotgame | Landing Page',
        // message: message,
        // data: ''
    });
    }
  }
};

const nodemailer = require('nodemailer');
const { findCampId, updateVisit, createVisit } = require('../models/campaignData');
async function sendVerificationEmail(email, token, id) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    // service:'sendGrid',
    secure: false, // use TLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers:'SSLv3'
    }
  });

  let url = base_url+'/verify-email?token='+token+"&email?="+email+"&id="+id;



  ejs.renderFile("./views/email_verify2.ejs", {url}, async function(error, data){
    if(error){
      console.log(error);
    }
    else{
      const mailOptions = {
        from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
        to: email,
        subject: '🎉 Your Verification Link to Claim 3 Free Spins!',
        html: data
      };

      // console.log("html data ======================>", mailOptions.html);
      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
      });
    }
  })
}

exports.createUser = async (req, res) => {
  const body = req.body;

  const token_email = sign({ email: body.email}, process.env.JWT_SECRET,{expiresIn: '1d'});
  body.token_email = token_email;

  
  create(body, (error, results) => {
      if(error){
          console.log(error);
          return res.status(500).json({
          success: 0,
          message: "Database connection error"
          });
      }

      User.createGameProfile(results.insertId, (error, results_) => {
          if(error){
            console.log(error);
            return res.status(500).json({
            success: 0,
            message: "Database connection error"
            });
          }

          sendVerificationEmail(body.email, token_email, results.insertId);
          const token = sign({ email: body.email}, process.env.JWT_SECRET,{});
          res.cookie('auth',token);
          return res.status(200).json({
            success: 1,
            data: results,
            message: "Registration Successful"
          });
      });

      

      // res.render('index.ejs', {
      //     title: 'Slotgame | Game Page',
      //     success: 1,
      //     message: "Login successfully",
      //     genMessage: "LoggedIn",
      //     token: token,
      // });
  });
  
}







exports.createUserFromAd = async (req, res) => {
  const body = req.body;

  const token_email = sign({ email: body.email}, process.env.JWT_SECRET,{expiresIn: '1d'});
  body.token_email = token_email;


  create(body, (error, results) => {
      if(error){
          console.log(error);
          return res.status(500).json({
          success: 0,
          message: "Database connection error"
          });
      }

      User.createGameProfile(results.insertId, (error, results_) => {
          if(error){
            console.log(error);
            return res.status(500).json({
            success: 0,
            message: "Database connection error"
            });
          }

          sendVerificationEmail(body.email, token_email, results.insertId);
          const token = sign({ email: body.email}, process.env.JWT_SECRET,{});
          res.cookie('auth',token);
          res.redirect('/home?id='+results.insertId)
      });
  });
  
}