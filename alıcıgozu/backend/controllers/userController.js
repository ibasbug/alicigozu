const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose= require('mongoose');
const registerUser = async (req, res) => {
  const { username, email, password, tasinmaz, arac, adress , city} = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanılıyor' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      tasinmaz,
      arac,
      adress,
      city,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Kullanıcı kaydedilemedi' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Geçersiz şifre' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Giriş yapılamadı' });
  }
};


async function fetchUserData(req, res) {
  const userId = req.params.userId;
  
  try {
    const user = await User.findById(userId).select('-password'); 
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  fetchUserData,
};
