const express = require('express');
const cors = require('cors');
const { validateUUID } = require('./utils');  // Import fungsi validasi UUID
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');


const db = require('./models'); 

const app = express();
app.use(express.json()); // Untuk parsing JSON

const JWT_SECRET = 'neko';

app.use(cors({
  origin: 'http://localhost:4200', // Alamat client Angular
  credentials: true, // Izinkan cookie atau kredensial
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'] // Header yang diizinkan
}));

// Konfigurasi penyimpanan file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../src/assets'));   // Simpan gambar di folder 'assets'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Beri nama file dengan timestamp
  }
});

const upload = multer({ storage: storage });

// CORS Options
const corsOptions = {
  origin: 'http://localhost:4200', // Atur domain asal Angular aplikasi kamu
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Sajikan folder assets secara statis
app.use('/assets', express.static('assets'));

// Routes untuk Blog Posts

// CREATE: Tambah blog post baru dengan file upload
app.post('/blog-posts', upload.single('image'), async (req, res) => {
  try {
    const { title, content, kategori, detail_deskripsi, tanggal } = req.body;
    const image_url = req.file ? `/assets/${req.file.filename}` : null;  
    const newPost = await db.BlogPost.create({ title, content, image_url, kategori, detail_deskripsi, tanggal });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: error.message });
  }
});
// READ: Dapatkan semua blog post
app.get('/blog-posts', async (req, res) => {
  try {
    const posts = await db.BlogPost.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Dapatkan blog post berdasarkan ID
app.get('/blog-posts/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.BlogPost.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE: Update blog post berdasarkan ID
app.put('/blog-posts/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { title, content, kategori, detail_deskripsi, tanggal } = req.body;
    const image_url = req.file ? `/assets/${req.file.filename}` : req.body.image_url;

    console.log('Updating blog post:', { title, content, image_url, kategori, detail_deskripsi, tanggal });

    const [updated] = await db.BlogPost.update(
      { title, content, image_url },
      { where: { id } }
    );
    if (updated) {
      const updatedPost = await db.BlogPost.findByPk(id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Hapus blog post berdasarkan ID dan hapus gambar dari folder
app.delete('/blog-posts/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Hapus file gambar jika ada
    if (post.image_url) {
      const imagePath = path.join(__dirname, post.image_url);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

    const deleted = await db.BlogPost.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes untuk Identitas Kantor

// CREATE: Tambah identitas kantor baru
app.post('/identitas-kantor', upload.fields([
  { name: 'foto_kantor', maxCount: 1 }, 
  { name: 'logo_kantor', maxCount: 1 }, 
  { name: 'gmaps', maxCount: 1 }
]), (req, res, next) => {
  console.log(req.files);  // Tambahkan ini untuk mengecek file yang diterima
  next();
}, async (req, res) => {
  try {
    const { kantor, deskripsi, alamat, kategori } = req.body;
    
    const foto_kantor = req.files['foto_kantor'] ? `/assets/${req.files['foto_kantor'][0].filename}` : null;
    const logo_kantor = req.files['logo_kantor'] ? `/assets/${req.files['logo_kantor'][0].filename}` : null;
    const gmaps = req.files['gmaps'] ? `/assets/${req.files['gmaps'][0].filename}` : null;

    const newKantor = await db.IdentitasKantor.create({
      kantor,
      deskripsi,
      alamat,
      foto_kantor,
      logo_kantor,
      gmaps,
      kategori
    });

    res.status(201).json(newKantor);
  } catch (error) {
    console.error('Error creating identitas kantor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ: Dapatkan semua identitas kantor
app.get('/identitas-kantor', async (req, res) => {
  try {
    const kantors = await db.IdentitasKantor.findAll();
    res.status(200).json(kantors);
  } catch (error) {
    console.error('Error fetching identitas kantor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ: Dapatkan identitas kantor berdasarkan ID
app.get('/identitas-kantor/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const kantor = await db.IdentitasKantor.findByPk(id);
    if (!kantor) {
      return res.status(404).json({ error: 'Kantor not found' });
    }
    res.status(200).json(kantor);
  } catch (error) {
    console.error('Error fetching identitas kantor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE: Update identitas kantor berdasarkan ID
app.put('/identitas-kantor/:id', upload.fields([
  { name: 'foto_kantor', maxCount: 1 }, 
  { name: 'logo_kantor', maxCount: 1 }, 
  { name: 'gmaps', maxCount: 1 }
]), async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { kantor, deskripsi, alamat, kategori } = req.body;

    const foto_kantor = req.files['foto_kantor'] ? `/assets/${req.files['foto_kantor'][0].filename}` : req.body.foto_kantor;
    const logo_kantor = req.files['logo_kantor'] ? `/assets/${req.files['logo_kantor'][0].filename}` : req.body.logo_kantor;
    const gmaps = req.files['gmaps'] ? `/assets/${req.files['gmaps'][0].filename}` : req.body.gmaps;

    const [updated] = await db.IdentitasKantor.update(
      { kantor, deskripsi, alamat, foto_kantor, logo_kantor, gmaps, kategori },
      { where: { id } }
    );

    if (updated) {
      const updatedKantor = await db.IdentitasKantor.findByPk(id);
      res.status(200).json(updatedKantor);
    } else {
      res.status(404).json({ error: 'Kantor not found' });
    }
  } catch (error) {
    console.error('Error updating identitas kantor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Hapus identitas kantor berdasarkan ID dan hapus foto dari folder
app.delete('/identitas-kantor/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.IdentitasKantor.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Kantor not found' });
    }

    const deleteFiles = async (filePath) => {
      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
            return reject(err);
          }
          resolve();
        });
      });
    };

    if (post.foto_kantor) {
      const imagePath = path.join(__dirname, post.foto_kantor);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

  if (post.logo_kantor) {
      const imagePath = path.join(__dirname, post.logo_kantor)
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }
    
    if (post.gmaps) {
      const imagePath = path.join(__dirname, post.gmaps);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

    const deleted = await db.IdentitasKantor.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Kantor not found' });
    }
  } catch (error) {
    console.error('Error deleting identitas kantor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// untuk table subemnu, layanan dan produk

app.get('/submenu-dan-layanan', async (req, res) => {
  try {
    const posts = await db.SubmenuDanLayanan.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/submenu-dan-layanan', upload.single('image'), async (req, res) => {
  try {
    const { judul, deskripsi, kategori } = req.body;
    const gambar = req.file ? `/assets/${req.file.filename}` : null;  // Buat URL gambar yang dapat diakses secara publik
    const newPost = await db.SubmenuDanLayanan.create({ judul, deskripsi, gambar, kategori });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/submenu-dan-layanan/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.SubmenuDanLayanan.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/submenu-dan-layanan/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { judul, deskripsi, kategori } = req.body;
    let gambar = req.body.image; // Ambil gambar yang ada dari body

    // Jika ada file baru yang diupload, gunakan file tersebut sebagai gambar baru
    if (req.file) {
      gambar = `/assets/${req.file.filename}`;
    }

    const [updated] = await db.SubmenuDanLayanan.update(
      { judul, deskripsi, gambar, kategori },
      { where: { id } }
    );
    
    if (updated) {
      const updatedPost = await db.SubmenuDanLayanan.findByPk(id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});


app.delete('/submenu-dan-layanan/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.SubmenuDanLayanan.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Hapus file gambar jika ada
    if (post.gambar) {
      const imagePath = path.join(__dirname, post.gambar);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }

    // Menghapus dari model yang benar
    const deleted = await db.SubmenuDanLayanan.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: error.message });
  }
});


// crud untuk table lain-lain

app.get('/lain-lain', async (req, res) => {
  try {
    const posts = await db.LainLain.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/lain-lain', async (req, res) => {
  try {
    const { judul, deskripsi, kategori } = req.body;

    // Log data yang diterima untuk debugging
    console.log('Data yang diterima untuk membuat post:', { judul, deskripsi, kategori });

    // Gunakan db.LainLain, bukan LainLain
    const newPost = await db.LainLain.create({ judul, deskripsi, kategori });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating lain-lain:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat entri.' });
  }
});


app.get('/lain-lain/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.LainLain.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching lain-lain:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/lain-lain/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { judul, deskripsi, kategori } = req.body;

    const [updated] = await db.LainLain.update(
      { judul, deskripsi, kategori },
      { where: { id } }
    );

    if (updated) {
      const updatedPost = await db.LainLain.findByPk(id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/lain-lain/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.LainLain.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const deleted = await db.LainLain.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// crud untuk profil

// Route untuk mengambil semua entri profil
app.get('/profil', async (req, res) => {
  try {
    const posts = await db.Profil.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route untuk membuat entri baru
app.post('/profil', upload.single('image'), async (req, res) => {
  try {
    const { judul, deskripsi, kategori } = req.body;
    const gambar = req.file ? `/assets/${req.file.filename}` : null;  // Buat URL gambar yang dapat diakses secara publik
    const newPost = await db.Profil.create({ judul, deskripsi, gambar, kategori });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route untuk mengambil entri berdasarkan id
app.get('/profil/:id', async (req, res) => {
  const id = req.params.id;
  
  // Validasi format UUID
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.Profil.findByPk(id);
    
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching profil:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route untuk mengupdate entri berdasarkan id
app.put('/profil/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { judul, deskripsi, kategori } = req.body;
    let gambar = req.body.image; // Ambil gambar yang ada dari body

    // Jika ada file baru yang diupload, gunakan file tersebut sebagai gambar baru
    if (req.file) {
      gambar = `/assets/${req.file.filename}`;
    }

    const [updated] = await db.Profil.update(
      { judul, deskripsi, gambar, kategori },
      { where: { id } }
    );
    
    if (updated) {
      const updatedPost = await db.Profil.findByPk(id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: error.message });
  }
});


// Route untuk menghapus entri berdasarkan id
app.delete('/profil/:id', async (req, res) => {
  const id = req.params.id;
  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const post = await db.Profil.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const deleted = await db.Profil.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting profil:', error);
    res.status(500).json({ error: error.message });
  }
});


// user

app.get('/user', async (req, res) => {
  try {
    const posts = await db.User.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/user', async (req, res) => {
  const { nama, password } = req.body;

  try {
    // Menggunakan findOne untuk mendapatkan satu pengguna
    const user = await db.User.findOne({ where: { nama: nama } });

    // Periksa jika pengguna ditemukan
    if (!user) {
      return res.status(400).json({ message: 'Username tidak ditemukan' });
    }

    console.log(req.body); // Menampilkan data yang diterima dari klien
    console.log(user); // Menampilkan data pengguna yang ditemukan

    // Validasi kata sandi
    const isPasswordValid = user.password === password; // Bandingkan kata sandi

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Jika login berhasil, kembalikan respons yang sesuai
    return res.status(200).json({ message: 'Login berhasil', user: { nama: user.nama, role: user.role } });

  } catch (error) {
    console.error('Error saat login:', error); // Mencetak kesalahan di console
    res.status(500).json({ message: 'Terjadi kesalahan', error });
  }  
});

// crud detail produk

app.get('/detail-produk', async (req, res) => {
  try {
    const posts = await db.DetailProduk.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/detail-produk', upload.fields([
  { name: 'gambar_kiri', maxCount: 1 },
  { name: 'gambar_tengah', maxCount: 1 },
  { name: 'gambar_kanan', maxCount: 1 },
  { name: 'gambar', maxCount: 1 }
]), async (req, res) => {
  try {
    const { 
      judul, 
      deskripsi,
      judul_slide,
      kategori 
    } = req.body;

    // Mengambil fitur dan keunggulan dari body
    const fitur = JSON.parse(req.body.fitur); // Pastikan fitur adalah JSON string
    const keunggulan = JSON.parse(req.body.keunggulan); // Pastikan keunggulan adalah JSON string

    // Menangani gambar yang diunggah
    const gambar_kiri = req.files['gambar_kiri'] ? `/assets/${req.files['gambar_kiri'][0].filename}` : null;
    const gambar_tengah = req.files['gambar_tengah'] ? `/assets/${req.files['gambar_tengah'][0].filename}` : null;
    const gambar_kanan = req.files['gambar_kanan'] ? `/assets/${req.files['gambar_kanan'][0].filename}` : null;
    const gambar = req.files['gambar'] ? `/assets/${req.files['gambar'][0].filename}` : null;

    // Membuat detail produk baru
    const newDetailProduk = await db.DetailProduk.create({
      judul, 
      deskripsi,
      fitur: fitur, // Simpan fitur langsung, pastikan ini sudah terstruktur dengan benar
      keunggulan: keunggulan, // Simpan keunggulan langsung
      judul_slide, 
      gambar_kiri, 
      gambar_tengah, 
      gambar_kanan, 
      gambar, 
      kategori
    });

    res.status(201).json(newDetailProduk);

  } catch (error) {
    console.error('Error creating detail produk:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/detail-produk/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const detail = await db.DetailProduk.findByPk(id);
    if (!detail) {
      return res.status(404).json({ error: 'detail not found' });
    }
    res.status(200).json(detail);
  } catch (error) {
    console.error('Error fetching detail produk:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE: Update detail produk berdasarkan ID
app.put('/detail-produk/:id', upload.fields([
  { name: 'gambar_kiri', maxCount: 1 },
  { name: 'gambar_tengah', maxCount: 1 },
  { name: 'gambar_kanan', maxCount: 1 },
  { name: 'gambar', maxCount: 1 }
]), async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const { 
      judul, 
      deskripsi,
      judul_fitur,
      deskripsi_fitur,
      judul_keungulan,
      deskripsi_keunggulan,
      judul_slide,
      kategori 
    } = req.body;

    const fiturData = {
      judul_fitur,
      deskripsi_fitur
    };

    const keunggulanData = {
      judul_keungulan,
      deskripsi_keunggulan
    }
    

    const gambar_kiri = req.files['gambar_kiri'] ? `/assets/${req.files['gambar_kiri'][0].filename}` : req.body.gambar_kiri;
    const gambar_tengah = req.files['gambar_tengah'] ? `/assets/${req.files['gambar_tengah'][0].filename}` : req.body.gambar_tengah;
    const gambar_kanan = req.files['gambar_kanan'] ? `/assets/${req.files['gambar_kanan'][0].filename}` : req.body.gambar_kanan;
    const gambar = req.files['gambar'] ? `/assets/${req.files['gambar'][0].filename}` : req.body.gambar;

    const [updated] = await db.DetailProduk.update(
      { 
        judul, 
        deskripsi,
        fitur: {fiturData}, 
        keunggulan: {keunggulanData},
        judul_slide, 
        gambar_kiri, 
        gambar_tengah, 
        gambar_kanan, 
        gambar, 
        kategori
      },
      { where: { id } }
    );

    if (updated) {
      const updatedDetail = await db.DetailProduk.findByPk(id);
      res.status(200).json(updatedDetail);
    } else {
      res.status(404).json({ error: 'Produk not found' });
    }
  } catch (error) {
    console.error('Error updating detail produk:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE: Hapus detail produk berdasarkan ID dan hapus foto dari folder
app.delete('/detail-produk/:id', async (req, res) => {
  const id = req.params.id;

  if (!validateUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const detail = await db.DetailProduk.findByPk(id);
    if (!detail) {
      return res.status(404).json({ error: 'Produk not found' });
    }

    const deleteFiles = async (filePath) => {
      if (fs.existsSync(filePath)) {
        return new Promise((resolve, reject) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting image file:', err);
              return reject(err);
            }
            resolve();
          });
        });
      }
    };

    await Promise.all([
      detail.gambar_kiri ? deleteFiles(path.join(__dirname, '..', detail.gambar_kiri)) : null,
      detail.gambar_tengah ? deleteFiles(path.join(__dirname, '..', detail.gambar_tengah)) : null,
      detail.gambar_kanan ? deleteFiles(path.join(__dirname, '..', detail.gambar_kanan)) : null,
      detail.gambar ? deleteFiles(path.join(__dirname, '..', detail.gambar)) : null
    ]);

    const deleted = await db.DetailProduk.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Produk not found' });
    }
  } catch (error) {
    console.error('Error deleting detail produk:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint untuk menambahkan fitur
app.post('/detail-produk/:id/fitur', async (req, res) => {
  const { detail_produk_id, fitur } = req.body;

  try {
    const detailProduk = await db.DetailProduk.findByPk(detail_produk_id);
    if (!detailProduk) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Menyimpan data fitur sebagai JSON
    detailProduk.fitur = fitur; // Anda mungkin perlu mengubah ini sesuai struktur tabel Anda
    await detailProduk.save();

    res.status(201).json(detailProduk);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan fitur' });
  }
});


app.get('/fitur', async (req, res) => {
  try {
    const fitur = await db.Fitur.findAll();
    res.json(fitur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Endpoint untuk mendapatkan fitur berdasarkan id
app.get('/fitur/:id', async (req, res) => {
  try {
    const fitur = await db.Fitur.findByPk(req.params.id);
    if (fitur) {
      res.json(fitur);
    } else {
      res.status(404).json({ error: 'Fitur not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


// Endpoint untuk menambahkan fitur
app.post('/fitur', async (req, res) => {
  const { judul, deskripsi, } = req.body;

  if (!judul || !deskripsi) {
    return res.status(400).json({
      error: 'Judul, deskripsi, and detail_produk_id are required'
    });
  }

  try {
    const fitur = await db.Fitur.create({ judul, deskripsi });
    res.status(201).json(fitur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
});

// Endpoint untuk memperbarui fitur
app.put('/fitur/:id', async (req, res) => {
  const { judul, deskripsi, detail_produk_id } = req.body;

  if (!judul || !deskripsi || !detail_produk_id) {
    return res.status(400).json({
      error: 'Judul, deskripsi, and detail_produk_id are required'
    });
  }

  try {
    const fitur = await db.Fitur.findByPk(req.params.id);
    if (fitur) {
      fitur.judul = judul;
      fitur.deskripsi = deskripsi;
      fitur.detail_produk_id = detail_produk_id;
      await fitur.save();
      res.json(fitur);
    } else {
      res.status(404).json({ error: 'Fitur not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
});


// Endpoint untuk menghapus fitur
app.delete('/fitur/:id', async (req, res) => {
  try {
    const fitur = await db.Fitur.findByPk(req.params.id);
    if (fitur) {
      await fitur.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Fitur not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// hubungi kami

app.post('/formulir_pesan', async (req, res) => {
  const { nama_lengkap, perusahaan_instansi, email, nohp_whatsapp, produk_solusi, pesan } = req.body;
  try {
    const newMessage = await db.hubungikami.create({
      nama_lengkap,
      perusahaan_instansi,
      email,
      nohp_whatsapp,
      produk_solusi,
      pesan,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// READ: Mengambil semua data dari tabel formulir_pesan
app.get('/formulir_pesan', async (req, res) => {
  try {
    const messages = await db.hubungikami.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// READ: Mengambil data berdasarkan ID
app.get('/formulir_pesan:id', async (req, res) => {
  try {
    const message = await db.hubungikami.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE: Memperbarui data berdasarkan ID
app.put('/formulir_pesan:id', async (req, res) => {
  const { nama_lengkap, perusahaan_instansi, email, nohp_whatsapp, produk_solusi, pesan } = req.body;
  try {
    const message = await db.hubungikami.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await message.update({
      nama_lengkap,
      perusahaan_instansi,
      email,
      nohp_whatsapp,
      produk_solusi,
      pesan,
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELE TE: Menghapus data berdasarkan ID
app.delete('/formulir_pesan/:id', async (req, res) => {
  try {
    const message = await db.hubungikami.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await message.destroy();
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
