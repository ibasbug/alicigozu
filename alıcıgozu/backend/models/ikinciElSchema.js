const mongoose = require('mongoose');


const ikinciElSchema = new mongoose.Schema({
    username:  {required: true, type: String},
    tur:{ type:String, default: 'ikinciel'},
   userId:  {required: true, type: String},
   baslik: { type: String, required: true },
   aciklama: { type: String, required: true },
   fiyat: { type: Number, required: true },
   il: { type: String, required: true },  
   ilce: { type: String, required: true },
   mahalle: { type: String, required: true },
   telefon:{type: String, required: true},
   eposta: { type: String, required: true},
   tiklanmaSayisi:{type: Number, default: 0},
   tip: { type: String, required: true},
   createdAt: { type: Date, default: Date.now },
   resimler: { type: Array},
   carsiDate: { type: String, default: null },
   dereceDate: { type: String,default:null},


})


const ikinciEl = mongoose.model('ikinciEl', ikinciElSchema);
module.exports = ikinciEl;