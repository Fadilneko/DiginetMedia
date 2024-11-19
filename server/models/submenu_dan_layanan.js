// models/blogPost.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class SubmenuDanLayanan extends Model {}

SubmenuDanLayanan.init({
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
  tableName: 'submenu_layanan_dan_produk', // Nama tabel di database
  timestamps: false, // Jika Anda tidak menggunakan createdAt dan updatedAt
});

module.exports = SubmenuDanLayanan;
