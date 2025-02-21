const Sequelize = require('sequelize');
const mysql = require('mysql2');
const Campaign = require('./Campaign');
const Spin = require('./Spins');
const GamePage = require('./GamePage');
const Fundpage = require('./FundPage');
const EmailVerification = require('./EmailVerification');
const DailyEmail = require('./DailyEmail');
const CreditCard = require('./CreditCard');
const Transaction = require('../Transaction');
const User_profile = require('./User_profile');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const User_Data = sequelize.define('users', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    default: null
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: true
  },
  verified: {
    type: Sequelize.DataTypes.BOOLEAN,
    default: false
  },
  verify_token: {
    type: Sequelize.DataTypes.STRING,
    default: null
  }
});

// Create the table (if it doesn't exist)
User_Data.sync()
  .then(() => {
    // console.log('User table created successfully!');
  })
  .catch(error => {
    console.error('Error creating User table:', error);
  });

User_Data.hasMany(Campaign, { foreignKey: 'user_id' });
Campaign.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(Spin, { foreignKey: 'user_id' });
Spin.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(GamePage, { foreignKey: 'user_id' });
GamePage.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(Fundpage, { foreignKey: 'user_id' });
Fundpage.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(EmailVerification, { foreignKey: 'user_id' });
EmailVerification.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(DailyEmail, { foreignKey: 'user_id' });
DailyEmail.belongsTo(User_Data, { foreignKey: 'user_id' });

User_Data.hasMany(CreditCard, { foreignKey: 'user_id' });
CreditCard.belongsTo(User_Data, { foreignKey: 'user_id' });

// User_Data.hasOne(User_profile, { foreignKey: 'user_id' });
// User_profile.belongsTo(User_Data, { foreignKey: 'user_id' });

module.exports = User_Data