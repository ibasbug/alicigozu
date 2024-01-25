const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./router/userRoutes');
const ilanRoutes = require('./router/ilanRoutes');
const connectToDb = require('./config/connectToDb');
const helmet = require('helmet');

dotenv.config();
const app = express();
connectToDb();

app.use(express.json()); // JSON veri almak için
app.use(express.urlencoded({ extended: true })); // URL-encoded veri almak için
app.use(cors({
  origin: 'http://localhost:3000',
  method:["GET","POST,"]
}))
// Kullanıcı ve ilan route'larını belirtilen path'lere yönlendirme
app.use('/api', userRoutes);
app.use('/api', ilanRoutes);
app.use(helmet());  
// Veritabanına bağlantıyı sağlama


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor.`);
});