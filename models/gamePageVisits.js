// const db = require('../config/db');
const pool = require("../config/db");

const GamePageVisits = {
    
    createVisits: (req, callback) => {
        const { user_id } = req.body;
        
        pool.query(
          `insert into game_page_visits
            (user_id, number)
            values(?,?)`,
            [user_id, 1],
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
        `update game_page_visits set
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
        pool.query('SELECT * FROM game_page_visits WHERE user_id = ?', 
        [user_id], 
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },


    getAllGamePageVisits: (callback) => {
        pool.query('SELECT * FROM game_page_visits',
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },
};

module.exports = GamePageVisits;