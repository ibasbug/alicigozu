const mongoose = require("mongoose");

const evSchema = new mongoose.Schema({

  username:  {required: true, type: String},
  tur:{ type:String, default: 'ev'},
  userId: { type: String, required: true,},
  baslik: { type: String, required: true },
  aciklama: { type: String, required: true },
  fiyat: { type: Number, required: true },
  odalar: { type: String, required: true },
  metrekare: { type: Number, required: true },
  il: { type: String, required: true },
  semt: { type: String, required: true },
  ilce: { type: String, required: true },
  mahalle: { type: String, required: true },
  resim:{ type: String },
  tip:{type: String, required: true},
  yas: {type: Number, required: true},
  telefon:{type: String, required: true},
  eposta: { type: String, required: true},
  katsayisi: { type: Number, required: true},
  bulundugukat: { type: Number, required: true},
  balkon:{ type: Number, required: true},
  esyali: { type: String, required: true},
  metrekareB: { type: Number, required: true},
  banyo:{ type: Number, required: true},
  tiklanmaSayisi:{type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
  resimler: { type: Array},
  carsiDate: { type: String, default: null },
  dereceDate: { type: String,default:null},



  

});

const ev = mongoose.model('ev', evSchema);
module.exports = ev;
