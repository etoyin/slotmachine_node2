const Sequelize = require('sequelize');
const mysql = require('mysql2');
const Campaign = require('./Campaign');
const User_Data = require('./User_Data');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const Spin = sequelize.define('spins_number', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
        model: User_Data,
        key: 'id'
    }
  },
  number: {
    type: Sequelize.INTEGER,
  },
});

// User_Data.hasMany(Spin, { foreignKey: 'user_id' });
// Spin.belongsTo(User_Data, { foreignKey: 'user_id' });


// Create the table (if it doesn't exist)
Spin.sync()
  .then(() => {
    // console.log('Spin table created successfully!');
  })
  .catch(error => {
    console.error('Error creating Spin table:', error);
    
  });



  module.exports = Spin