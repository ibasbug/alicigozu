const mongoose = require('mongoose');


const isyeriSchema = new mongoose.Schema({
    username:  {required: true, type: String},
    tur:{ type:String, default: 'isyeri'},
   userId:  {required: true, type: String},
   baslik: { type: String, required: true },
   aciklama: { type: String, required: true },
   fiyat: { type: Number, required: true },
   il: { type: String, required: true },
   ilce: { type: String, required: true },
   mahalle: { type: String, required: true},
   tip: {type: String, required: true},
   metrekare: { type: String, required: true},
   katsayisi: { type: String, required: true},
   tiklanmaSayisi:{type: Number, default: 0},
   telefon:{type: String, required: true},
   eposta: { type: String, required: true},
   createdAt: { type: Date, default: Date.now },
   resimler: { type: Array},
   carsiDate: { type: String, default: null },
   dereceDate: { type: String,default:null},



})


const isyeri = mongoose.model('isyeri', isyeriSchema);
module.exports = isyeri;