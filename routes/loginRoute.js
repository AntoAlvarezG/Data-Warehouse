const express = require('express');
const router = express.Router();
const { validateLogin, login } = require('../controllers/login');

router.post('/', validateLogin, login)

module.exports = router;