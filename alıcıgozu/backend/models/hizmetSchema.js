const mongoose = require('mongoose');


const hizmetSchema = new mongoose.Schema({
    username:  {required: true, type: String},
    tur:{ type:String, default: 'hizmet'},
   userId:  {required: true, type: String},
   baslik: { type: String, required: true },
   aciklama: { type: String, required: true },
   fiyat: { type: Number, required: true },
   il: { type: String, required: true },
   ilce: { type: String, required: true },
   mahalle: { type: String, required: true},
   hizmetturu: { type: String, required: true},
   tiklanmaSayisi:{type: Number, default: 0},
   eposta: { type: String, required: true},
   telefon: { type: String, required: true},
   createdAt: { type: Date, default: Date.now },
   resimler: { type: Array},
   carsiDate: { type: String, default: null },
   dereceDate: { type: String,default:null},


})


const hizmet = mongoose.model('hizmet', hizmetSchema);
module.exports = hizmet;