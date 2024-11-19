
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type:DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'user',
  timestamps: false, 
});


module.exports = User;
