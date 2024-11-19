// models/blogPost.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class Fitur extends Model {}

Fitur.init({
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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  detail_produk_id: {
    type:DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4,
    primaryKey:true
  }
  
}, {
  sequelize,
  tableName: 'fitur_produk', // Nama tabel di database
  timestamps: false, // Jika Anda tidak menggunakan createdAt dan updatedAt
});

module.exports = Fitur;
