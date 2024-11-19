
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class LainLain extends Model {}

LainLain.init({
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
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  sequelize,
  tableName: 'lain_lain', // Nama tabel di database
  timestamps: false, // Jika Anda tidak menggunakan createdAt dan updatedAt
});

module.exports = LainLain;
