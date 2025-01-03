const Sequelize = require('sequelize');
const mysql = require('mysql2');
const User_Data = require('./Admin/User_Data');
// const Campaign = require('./Campaign');
// const User_Data = require('./User_Data');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const Transaction = sequelize.define('transactions', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
        model: User_Data,
        key: 'id'
    }
  },
  transaction_id: {
    type: Sequelize.DataTypes.STRING,
    unique: true
  },
  amount: {
    type: Sequelize.DataTypes.INTEGER,
  },
  status: {
    type: Sequelize.DataTypes.STRING,
  },
  createdAt: {
    type: Sequelize.DataTypes.DATE,
     allowNull: false
 },
 updatedAt: {
     type: Sequelize.DataTypes.DATE,
     allowNull: false
 }
});

// User_Data.hasMany(Transaction, { foreignKey: 'user_id' });

// Transaction.belongsTo(User_Data, { foreignKey: 'user_id' });

// Create the table (if it doesn't exist)
Transaction.sync()
  .then(() => {
    console.log('Transaction table created successfully!');
  })
  .catch(error => {
    console.error('Error creating Transaction:', error);
    
  });



  module.exports = Transaction