// const db = require('../config/db');
const pool = require("../config/db");

const User = {
  // create: (userData, callback) => {
  //   const { email} = userData;
  //   db.query('INSERT INTO users (email, password) VALUES (?, ?, ?)', [email, ""], callback);
  // },

  createVisits: (req, callback) => {
    const { identifier } = req.body;
    
    pool.query(
      `insert into visits
        (identifier, number)
        values(?,?)`,
        [identifier, 1],
        (error, results, fields) => {
          if(error){
            return callback(error);
          }

          let user_id = results.insertId;
          return callback(null, results)
        }
      )
  },

  create: (body, callback) => {
    const { email, token_email } = body;
    
    pool.query(
      `insert into users
        (email, password, verify_token)
        values(?,?,?)`,
        [email,"", token_email],
        (error, results, fields) => {
          if(error){
            return callback(error);
          }

          let user_id = results.insertId;
          return callback(null, results)
        }
      )
  },

  updateVerified: (data, callback) => {
    pool.query(
      `update users set
        verified=?
        where id=?`,
        [
          true,
          data
        ],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  },

  createGameProfile: (id, callback) => {
    
    pool.query(
      `insert into gamer_profile
        (user_id)
        values(?)`,
        [id],
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
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results, field) => {
      if(error){
        return callback(error);
      }
      return callback(null, results)
    });
  },

  updateIdentifier: (data, callback) => {
    const {
      identifier,
      number
    } = data;
    pool.query(
      `update visits set
        number=?
        where identifier=?`,
        [
          number + 1,
          identifier
        ],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  },

  findIdentifier: (identifier, callback) => {
    pool.query('SELECT * FROM visits WHERE identifier = ?', 
      [identifier], 
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


  getAllUsers: (callback) => {
    pool.query('SELECT * FROM users',
      (error, results, field) => {
        if(error){
          return callback(error);
        }
        return callback(null, results)
      });
  },
};

module.exports = User;