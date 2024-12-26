const Sequelize = require('sequelize');
const mysql = require('mysql2');
const User_Data = require('./User_Data');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const Campaign = sequelize.define('campaign_data', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.STRING,
    references: {
        model: User_Data,
        key: 'id'
    }
  },
  camp_id: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    references: {
        model: User_Data,
        key: 'email'
    }
  },
  number: {
    type: Sequelize.INTEGER,
  },
});

// User_Data.hasMany(Campaign, { foreignKey: 'email' });
// Campaign.belongsTo(User_Data, { foreignKey: 'email' });

// Create the table (if it doesn't exist)
Campaign.sync()
  .then(() => {
    // console.log('User table created successfully!');
  })
  .catch(error => {
    console.error('Error creating User table:', error);
  });

  module.exports = Campaign