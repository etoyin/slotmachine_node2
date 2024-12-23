// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const { findUserId, updateVisit, createVisits, getAllFundPageVisits, getWalletBalance } = require('../models/fundpage');


require('dotenv').config();

exports.getWalletBalance = async (req, res) => {
    let body = req.body;
    getWalletBalance(body.user_id, (error, results) => {
        if(error){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "There was an error, getting balance!"
            });
        }
        console.log(body);
        return res.status(200).json({
            success: 1,
            data: results,
            message: "Successfull!"
        });
    })
};

exports.viewPage = async (req, res) => {
        res.render('fund_wallet.ejs', {
            title: 'Slotgame | Fund Page',
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

exports.createFundVisits = async (req, res) => {
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
  
