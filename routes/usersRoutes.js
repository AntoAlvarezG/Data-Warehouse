const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { authAdmin } = require('../controllers/login');
const { 
    validateUser,
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser 
    } = require('../controllers/users');

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 5 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
});

// get all users
router.get('/', getUsers);

// get user by id
router.get('/:id', authAdmin, getUserById);

// add new user
router.post('/add', 
authAdmin, 
validateUser,  
accountLimiter, 
addUser);

// update user data
router.put('/:id', authAdmin, validateUser, updateUser);

// delete user
router.delete('/:id', authAdmin, deleteUser);

module.exports = router;