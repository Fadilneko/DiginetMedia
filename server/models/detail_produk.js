// models/blogPost.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class DetailProduk extends Model {}

DetailProduk.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  judul_slide: {
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
  fitur: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  keunggulan: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  gambar_kiri: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gambar_tengah: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gambar_kanan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'detail_produk', // Nama tabel di database
  timestamps: false,
});

module.exports = DetailProduk;
