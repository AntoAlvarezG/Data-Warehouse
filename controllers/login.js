const pool = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('./validate');
require('dotenv').config();

const login = (req, res) => {
    const { email, pass } = req.body;
    pool.query(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.status(404).json({ msg: 'User not found.'})
            // verify password
            bcrypt.compare(pass, rows[0].pass, (err, result) => {
                if (err) console.log(err);
                if (!result) return res.status(400).json({ msg: 'Invalid password. Try again.' })
                // generate access token
                const accessToken = jwt.sign( JSON.stringify(rows[0]), process.env.ACCESS_TOKEN_SECRET );
                res.status(200).json( { accessToken: accessToken })
            });
        }
    )
}

const authAdmin = (req, res, next) => {
    // get token from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // if there is no token return unauthorized status
    if (token == null) res.sendStatus(401);
    // if there is, get user data from that token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) console.log(err)
        // if user isn't admin send forbidden status
        if (user.user_profile != 'admin') return res.sendStatus(403);
        // if user is admin continue
        next();
    })
}

const validateLogin = (req, res, next) => {
    const rules = {
        "email": "required|email",
        "pass": "required|string|min:6"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ err })
        }
        next()
    })
}

module.exports = {
    login,
    validateLogin,
    authAdmin
};