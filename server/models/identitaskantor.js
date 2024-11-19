// models/identitas_kantor.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Path ke konfigurasi Sequelize Anda

class IdentitasKantor extends Model {}

IdentitasKantor.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  kantor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo_kantor: {
    type: DataTypes.STRING,
  },
  foto_kantor: {
    type: DataTypes.STRING,
  },
  gmaps: {
    type: DataTypes.STRING,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'identitas_kantor', 
  timestamps: false,
});

module.exports = IdentitasKantor;