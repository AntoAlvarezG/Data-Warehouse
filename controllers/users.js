const pool = require('../database/connection');
const bcrypt = require('bcrypt');
const validator = require('./validate');

const validateUser = (req, res, next) => {
    const rules = {
        "name": "required|string",
        "last_name": "required|string",
        "email": "required|email",
        "user_profile": "required|string|in:admin,regular",
        "pass": "required|string|min:6",
        "rep_pass": "required|same:pass"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ err })
        }
        next()
    })
}

const getUsers = (req, res) => {
    pool.query(
        'SELECT * FROM users',
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.status(404).json({ msg: 'No users yet.'})
            res.status(200).json(rows)
        }
    )
}

const getUserById = (req, res) => {
    pool.query(
        'SELECT * FROM users WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            res.status(200).json(rows[0])
        }
    )
}

const addUser = (req, res) => {
    const { name, last_name, email, user_profile, pass } = req.body;
    
    pool.query(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows != false) return res.status(400).json({ msg: 'User already exists.'});
            bcrypt.hash(pass, 10, (err, hashedPass) => {
                if (err) return res.status(400).json({ err })
                pool.query(
                    `INSERT INTO users (name, last_name, email, user_profile, pass, rep_pass)
                    VALUES (?,?,?,?,?,?)`,
                    [name, last_name, email, user_profile, hashedPass, hashedPass],
                    (err, result) => {
                        if (err) return res.status(400).json({ err })
                        res.status(201).json({ msg: 'New user created.' })
                    }
                )
            })
        }
    )
}

const updateUser = (req, res) => {
    const { name, last_name, email, user_profile, pass } = req.body;
    pool.query(
        'SELECT * FROM users WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) return res.sendStatus(404)
            bcrypt.hash(pass, 10, (err, hashedPass) => {
                if (err) return res.status(400).json({ err })
                pool.query(
                    `UPDATE users
                    SET name=?, last_name=?, email=?, user_profile=?, pass=?, rep_pass=?
                    WHERE id=?`,
                    [ name, last_name, email, user_profile, hashedPass, hashedPass, req.params.id ],
                    (err) => {
                        if (err) return res.status(400).json({ err })
                        res.status(200).json({ msg: 'User data updated' }) 
                    }
                )
            })
        }
    )
}

const deleteUser = (req, res) => {
    pool.query(
        'SELECT * FROM users WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) {
                return res.status(404).json({ msg: 'Not found.' })
            }
            pool.query(
                'DELETE FROM users WHERE id=?',
                [rows[0].id],
                (err) => {
                    if (err) return res.status(400).json({ err })
                    res.status(200).json({ msg: 'User deleted.' })
                }
            )
        }
    )
}

module.exports = {
    validateUser,
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}