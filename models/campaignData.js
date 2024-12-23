// const db = require('../config/db');
const pool = require("../config/db");

const campaignData = {
    createVisit: (req, callback) => {
        const { camp_id, email } = req.body;
        
        pool.query(
          `insert into campaign_data
            (camp_id, email, number)
            values(?,?,?)`,
            [camp_id, email, 1],
            (error, results, fields) => {
              if(error){
                return callback(error);
              }
    
              let user_id = results.insertId;
              return callback(null, results)
            }
          )
    },
    updateVisit: (data, callback) => {
        const {
            camp_id,
            number,
        } = data;
        const email = data.email ? data.email : "";
        pool.query(
        "update campaign_data set number=?, email=? where camp_id=?",
            [
            Number(number) + 1,
            email,
            camp_id,
            ],
            (error, results, field) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
            }
        )
    },

    findCampId: (camp_id, callback) => {
        pool.query('SELECT * FROM campaign_data WHERE camp_id = ?', 
        [camp_id], 
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },


    getAllCreditCardPageVisits: (callback) => {
        pool.query('SELECT * FROM campaign_data',
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },
};

module.exports = campaignData;