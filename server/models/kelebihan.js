// models/blogPost.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda


class Kelebihan extends Model {}

Kelebihan.init({
  id_kelebihan: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'kelebihan', // Nama tabel di database
  timestamps: false, // Jika Anda tidak menggunakan createdAt dan updatedAt
});




module.exports = Kelebihan;
