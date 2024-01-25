const mongoose = require('mongoose');


const parcaSchema = new mongoose.Schema({
   ilanNo: {required: true, type: String},
   userId:  {required: true, type: String},
   tur:{ type:String, default: 'parca'},
   username:  {required: true, type: String},
   eposta: {type:String, },
   telefon: {type:String, required: true,},
   baslik: { type: String, required: true },
   aciklama: { type: String, required: true },
   fiyat: { type: Number, required: true },
   il: { type: String, required: true },
   ilce: { type: String, required: true },
   mahalle: { type:String, required: false },
   tiklanmaSayisi:{type: Number, default: 0},
   marka: { type: String, required: true},
   tip: { type: String },
   kimden: { type: String},
   cikma: {type : String},
   orijinal: { type: String},
   createdAt: { type: Date, default: Date.now },

    resimler: { type: Array},
   
   carsiDate: { type: String, default: null },
   dereceDate: { type: String,default:null},


})


const parca = mongoose.model('parca', parcaSchema);
module.exports = parca;