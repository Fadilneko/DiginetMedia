// models/identitas_kantor.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class hubungikami extends Model {}

hubungikami.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perusahaan_instansi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nohp_whatsapp: {
    type: DataTypes.STRING,
  },
  produk_solusi: {
    type: DataTypes.STRING,
  },
  pesan: {
    type: DataTypes.TEXT
  },
}, {
  sequelize,
  tableName: 'formulir_pesan', // Pastikan nama tabel sesuai dengan di database
  timestamps: false,
});

module.exports = hubungikami;
