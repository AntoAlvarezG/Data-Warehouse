const pool = require('../database/connection');
const validator = require('../controllers/validate');

const validateCompany = (req, res, next) => {
    const rules = {
        "name": "required|string",
        "address": "required|string",
        "email": "required|email",
        "phone": "required|string",
        "city_id": "required|integer"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json(err)
        }
        next()
    })
}

const addCompany = (req, res) => {
    const { name, address, email, phone, city_id } = req.body;
    pool.query(
        'SELECT * FROM companies WHERE name=?',
        [name],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows != false) return res.status(400).json({ msg: 'Company already exists.' })
            pool.query(
                `INSERT INTO companies (name, address, email, phone, city_id)
                VALUES (?,?,?,?,?)`,
                [name, address, email, phone, city_id],
                (err) => {
                    if (err) return res.status(400).json(err)
                    res.status(201).json({ msg: `${name} added.` })
                }
            )
        }
    )
}

const getCompanies = (req, res) => {
    pool.query(
        'SELECT * FROM companies',
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) res.status(404).json({ msg: 'No companies added yet.'})
            res.status(200).json(rows)
        }
    )
}

const updateCompany = (req, res) => {
    const { name, address, email, phone, city_id } = req.body;
    pool.query(
        'SELECT * FROM companies WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false ) return res.sendStatus(404)
            pool.query(
                `UPDATE companies
                SET name=?, address=?, email=?, phone=?, city_id=?
                WHERE id=?`,
                [name, address, email, phone, city_id, req.params.id],
                (err) => {
                    if (err) return res.status(400).json(err)
                    res.status(200).json({ msg: 'Company updated.' })
                }
            )
        }
    )
}

const deleteCompany = (req, res) => {
    pool.query(
        'SELECT * FROM companies WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false ) return res.sendStatus(404)
            pool.query(
                'DELETE FROM companies WHERE id=?',
                [req.params.id],
                (err, result) => {
                    if (err) return res.status(400).json(err)
                    res.status(200).json({ msg: 'Company deleted.'})
                }
            )
        }
    )
}

module.exports = {
    validateCompany,
    addCompany,
    getCompanies,
    updateCompany,
    deleteCompany
}