// const db = require('../config/db');
const pool = require("../../config/db");

const User = {
  // create: (userData, callback) => {
  //   const { email} = userData;
  //   db.query('INSERT INTO admin (email, password) VALUES (?, ?, ?)', [email, ""], callback);
  // },
  create: (body, callback) => {
    const { email, password } = body;
    
    pool.query(
      `insert into admin
        (email, password)
        values(?,?)`,
        [email,password],
        (error, results, fields) => {
          if(error){
            return callback(error);
          }

          let user_id = results.insertId;
          return callback(null, results)
        }
      )
  },

  findByEmail: (email, callback) => {
    pool.query('SELECT * FROM admin WHERE email = ?', [email], (error, results, field) => {
      if(error){
        return callback(error);
      }
      return callback(null, results)
    });
  },


  getAllUsers: (callback) => {
    pool.query('SELECT * FROM admin',
      (error, results, field) => {
        if(error){
          return callback(error);
        }
        return callback(null, results)
      });
  },
};

module.exports = User;