// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User_profile = require('../models/Admin/User_profile');
const { findUserId, updateSpin, createSpins, getAllSpins } = require('../models/spinsCount');
const User = require('../models/user');
require('dotenv').config();

exports.updateCoin = async (req, res) => {
  const body = req.body;
  try {
  
    let user_profile = await User_profile.findOne({
      where:{
        user_id: body.user_id,
      }
    });
  
    
    if(user_profile){
        user_profile.balance = body.balance;
        // console.log(Number(body.amount));
        
        await user_profile.save();
    }
    return res.json({
        status: 200,
        message: "remaining coin has been saved!"
    })
  } catch (error) {
    console.error('Error creating user:', error);
  }
  
}

exports.getAllSpins = async (req, res) => {
    
    getAllSpins((error, results) => {
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

exports.createSpins = async (req, res) => {
    const body = req.body;
    // body.identifier = v4();
  
    // findUserId(body.user_id, (error, results) => {
    //   if(results.length){
    //     let data = results[0];
    //     updateSpin(data, (err, resu) => {
    //       if(err){
    //           console.log(err);
    //           return res.status(500).json({
    //             success: 0,
    //             message: "There was an error!"
    //           });
    //       }
    //       return res.status(200).json({
    //         success: 1,
    //         data: resu,
    //         message: "Your spin been recorded and added!"
    //       });
  
    //     })
    //   }
    //   else{
        createSpins(req, (error, results) => {
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
            message: "Your spin has been recorded!"
          });
      // });
      // }
    });
    
}
  
