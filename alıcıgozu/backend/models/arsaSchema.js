const mongoose = require('mongoose');


const arsaSchema = new mongoose.Schema({
    username:  {required: true, type: String, unique: true},
    tur:{ type:String, default: 'arsa'},
   userId:  {required: true, type: String},
   tip: {required: true, type: String},
   baslik: { type: String, required: true },
   aciklama: { type: String, required: true },
   fiyat: { type: Number, required: true },
   il: { type: String, required: true },
   ilce: { type: String, required: true },

   metrekare: { type: Number, required: true },
   metrekaref: { type: String, required: true },
   imar: { type: String, required: true },
   adano: { type: Number, required: true },
   parselno: { type: Number, required: true },
   tapudurum: { type: String, required: true },
   katkarsiligi: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },

   eposta: { type: String, required: true },
   telefon: { type: String, required: true },
   resimler: { type: Array},
   carsiDate: { type: String, default: null },
   dereceDate: { type: String,default:null},


})


const arsa = mongoose.model('arsa', arsaSchema);
module.exports = arsa;