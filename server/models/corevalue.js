// models/blogPost.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class Corevalue extends Model {}

Corevalue.init({
  id_corevalue: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  tableName: 'corevalue', // Nama tabel di database
  timestamps: false, // Jika Anda tidak menggunakan createdAt dan updatedAt
});




module.exports = Corevalue;
