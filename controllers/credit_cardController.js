// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const { findUserId, updateVisit, createVisits } = require('../models/credit_card');




require('dotenv').config();

exports.viewCreditCardPage = async (req, res) => {
        res.render('credit_card.ejs', {
            title: 'Slotgame | Make Payment',
        });
}


exports.getFundAllVisits = async (req, res) => {
    
    getAllFundPageVisits((error, results) => {
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

exports.createCreditVisits = async (req, res) => {
    const body = req.body;
    // body.identifier = v4();
    
  
    // findUserId(body.user_id, (error, results) => {
    //   if(results && results.length){
    //     let data = results[0];
    //     updateVisit(data, (err, resu) => {
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
    //         message: "Your Visit has been recorded and added!"
    //       });
  
    //     })
    //   }
    //   else{
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
    //   }
    // });
    
}
  
