const Sequelize = require('sequelize');
const User_Data = require('./User_Data');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const Daily_Link = sequelize.define('daily_links', {
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
  token: {
    type: Sequelize.DataTypes.STRING,
  },
  expiresAt: {
    type: Sequelize.DataTypes.DATE,
       allowNull: false,
   },
}, {
    tableName: 'daily_links', // Specify the table name if it differs from the model's name
   });

// Create the table (if it doesn't exist)
Daily_Link.sync()
  .then(() => {
    // console.log('User table created successfully!');
  })
  .catch(error => {
    console.error('Error creating User table:', error);
  });


// User_Data.hasMany(Transaction, { foreignKey: 'user_id' });
// Transaction.belongsTo(User_Data, { foreignKey: 'user_id' });

module.exports = Daily_Link