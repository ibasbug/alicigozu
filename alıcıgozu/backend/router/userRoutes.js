const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    fetchUserData
  } = require('../controllers/userController.js');
  router.post('/kayit', registerUser);

  router.post('/login', loginUser);
  router.get('/user/data/:userId', fetchUserData)
  module.exports = router;