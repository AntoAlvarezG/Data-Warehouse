const pool = require('../database/connection');

const getAllCountries = (req, res) => {
    pool.query(
        'SELECT * FROM countries WHERE region_id=?',
        [req.params.region_id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) {
                return res.status(404).json({ msg: 'No countries added yet.' })
            }
            res.status(200).json(rows)
        }
    )
}

const addCountry = (req, res) => {
    pool.query(
        `SELECT name FROM countries WHERE name=?`,
        [req.body.name],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows != false) {
                return res.status(400).json({ msg: 'Country already exists.' })
            }
            pool.query(
                `INSERT INTO countries (name, region_id) VALUES (?,?)`,
                [req.body.name, req.params.region_id],
                (err, result) => {
                    if (err) return res.status(400).json({ err })
                    res.status(201).json({ msg: 'Country added.' })
                }
            )
        }
    )
}

const getCountryById = (req, res) => {
    pool.query(
        'SELECT * FROM countries WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            res.status(200).json(rows[0])
        }
    )
}

const updateCountry = (req, res) => {
    pool.query(
        'SELECT * FROM countries WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            pool.query(
                'UPDATE countries SET name=? WHERE id=?',
                [req.body.name, req.params.id],
                (err, rows) => {
                    if (err) return res.status(400).json({ err })            
                    res.status(200).json({ msg: 'Country updated.'})
                }
            )
        }
    ) 
}

const deleteCountry = (req, res) => {
    pool.query(
        'SELECT * FROM countries WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            pool.query(
                `DELETE FROM countries WHERE id=?`,
                [req.params.id],
                (err, result) => {
                    if (err) return res.status(400).json({ err })
                    res.status(200).json({ msg: 'Country deleted.' })
                }
            )
        }
    )
}

module.exports = {
    getAllCountries,
    addCountry,
    getCountryById,
    updateCountry,
    deleteCountry
}