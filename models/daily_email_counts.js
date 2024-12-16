// const db = require('../config/db');
const pool = require("../config/db");

const daily_email_counts = {
    createVisits: (req, callback) => {
        const { id } = req.query;

        pool.query(
          `insert into daily_email_clicks
            (user_id, number)
            values(?,?)`,
            [id, 1],
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
        user_id,
        number
        } = data;
        pool.query(
        `update daily_email_clicks set
            number=?
            where user_id=?`,
            [
            Number(number) + 1,
            user_id
            ],
            (error, results, field) => {
            if(error){
                return callback(error);
            }
            return callback(null, results)
            }
        )
    },

    findUserId: (user_id, callback) => {
        pool.query('SELECT * FROM daily_email_clicks WHERE user_id = ?', 
        [user_id], 
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },


    getAllDailyEmailClicks: (callback) => {
        pool.query('SELECT * FROM daily_email_clicks',
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },
};

module.exports = daily_email_counts;