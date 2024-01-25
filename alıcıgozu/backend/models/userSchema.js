const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password : {
        type : String,
        required : true,

    },
    
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    arac: {type: String},
    adress: {type: String},
    city:{type: String},
    tasinmaz: {type: String},
    favorites: {
        type : Array,
        default: [],

    }

})
const User = mongoose.model('User', userSchema)
module.exports = User