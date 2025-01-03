// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Daily_Link = require('../models/Admin/Daily_Email_Link');
const { sign, verify } = require("jsonwebtoken");
// const { getAllEmailClicks, findUserId, updateVisit, createVisits } = require('../models/email_verify');



require('dotenv').config();

const nodemailer = require('nodemailer');
const { getAllDailyEmailClicks, findUserId, updateVisit, createVisits } = require("../models/daily_email_counts");
const User_profile = require("../models/Admin/User_profile");





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

    const { email, id } = req.query;

    const token = sign({ email: email}, process.env.JWT_SECRET,{});
    res.cookie('auth',token);


    const link_token = req.query.token;
    
    try {
      const link = await Daily_Link.findOne({where: {token : link_token}});
        // if (!link) {
        //     return res.status(400).send("Invalid or Expired token or Already Used");
        // }
        // if (new Date() > link.expiresAt ) {
        //     return res.status(400).send("Link has expired");
        // }

        if(link && new Date() <= link.expiresAt ){
          await link.destroy();

          const user_profile = await User_profile.findOne({
            where:{
                user_id: id,
            }
          });
          // console.log(user_profile);
          // console.log(user_profile.balance);
      
          if(user_profile){
            user_profile.balance = Math.ceil(60 + Number(user_profile.balance ? user_profile.balance : 0));
            // console.log(Number(body.amount));
            
            await user_profile.save();
          }  
        }

        
         // Now you can do something with your user.
        //  res.send("User verified, and link is now invalid.");
     } catch (error){
          console.error(error)
       res.status(500).send("There was an error");
     }

    

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
  
