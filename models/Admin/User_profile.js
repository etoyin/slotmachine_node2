const Sequelize = require('sequelize');
const User_Data = require('./User_Data');


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

// Define a model
const User_profile = sequelize.define('gamer_profile', {
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
  balance: {
    type: Sequelize.DataTypes.STRING,
    default: "100",
  },
}, {
    tableName: 'gamer_profile', // Specify the table name if it differs from the model's name
   });

// Create the table (if it doesn't exist)
User_profile.sync()
  .then(() => {
    // console.log('User table created successfully!');
  })
  .catch(error => {
    console.error('Error creating User table:', error);
  });


// User_Data.hasMany(Transaction, { foreignKey: 'user_id' });
// Transaction.belongsTo(User_Data, { foreignKey: 'user_id' });

module.exports = User_profile