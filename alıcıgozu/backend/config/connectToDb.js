const mongoose = require('mongoose'); 
 
 function connectToDb(){
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB\'ye bağlandı');
  })
  .catch(err => console.log('MongoDB bağlantı hatası:', err));

  }
  module.exports = connectToDb;