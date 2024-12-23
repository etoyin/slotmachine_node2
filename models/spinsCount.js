// const db = require('../config/db');
const pool = require("../config/db");

const Spins = {
    
    createSpins: (req, callback) => {
        const { user_id } = req.body;
        
        pool.query(
          `insert into spins_numbers
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
    updateSpin: (data, callback) => {
        const {
        user_id,
        number
        } = data;
        pool.query(
        `update spins_numbers set
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
        pool.query('SELECT * FROM spins_numbers WHERE user_id = ?', 
        [user_id], 
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },

    findAllIdentifier: (callback) => {
        pool.query('SELECT * FROM visits',
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },


    getAllSpins: (callback) => {
        pool.query('SELECT * FROM spins_numbers',
        (error, results, field) => {
            if(error){
            return callback(error);
            }
            return callback(null, results)
        });
    },
};

module.exports = Spins;