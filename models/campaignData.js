// const db = require('../config/db');
const pool = require("../config/db");

const campaignData = {
    createVisit: (req, callback) => {
        const { camp_id } = req.body;
        
        pool.query(
          `insert into campaign_data
            (camp_id, number)
            values(?,?)`,
            [camp_id, 1],
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
            number
        } = data;
        pool.query(
        `update campaign_data set
            number=?
            where camp_id=?`,
            [
            Number(number) + 1,
            camp_id
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