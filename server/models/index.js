const sequelize = require('../config/database');
const BlogPost = require('./blog_post'); // Pastikan nama file dan kelas sesuai
const IdentitasKantor = require('./identitaskantor');
const LainLain = require('./lain_lain');
const SubmenuDanLayanan = require('./submenu_dan_layanan'); 
const Profil = require('./profil');

const User = require('./user');
const DetailProduk = require('./detail_produk');
const Fitur = require ('./fitur_produk')
const hubungikami = require ('./hubungi-kami')

// Inisialisasi model
const db = {};
db.sequelize = sequelize;
db.BlogPost = BlogPost;
db.IdentitasKantor = IdentitasKantor;
db.SubmenuDanLayanan = SubmenuDanLayanan;
db.LainLain = LainLain;
db.Profil = Profil; 
db.User = User;
db.DetailProduk = DetailProduk;
db.Fitur = Fitur;
db.hubungikami = hubungikami;


db.sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });


module.exports = db;
