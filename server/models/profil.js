const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Profil extends Model {}

Profil.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'profil',
  timestamps: false,
});

module.exports = Profil;