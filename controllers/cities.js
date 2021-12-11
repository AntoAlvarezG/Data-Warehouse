const pool = require('../database/connection');

const getAllCities = (req, res) => {
    pool.query(
        'SELECT * FROM cities WHERE country_id=?',
        [req.params.country_id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) {
                return res.status(404).json({ msg: 'No cities added yet.' })
            }
            res.status(200).json(rows)
        }
    )
}

const addCity = (req, res) => {
    pool.query(
        `SELECT name FROM cities WHERE name=?`,
        [req.body.name],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows != false) {
                return res.status(400).json({ msg: 'City already exists.' })
            }
            pool.query(
                `INSERT INTO cities (name, country_id) VALUES (?,?)`,
                [req.body.name, req.params.country_id],
                (err, result) => {
                    if (err) return res.status(400).json({ err })
                    res.status(201).json({ msg: 'City added.' })
                }
            )
        }
    )
}

const getCityById = (req, res) => {
    pool.query(
        'SELECT * FROM cities WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            res.status(200).json(rows[0])
        }
    )
}

const updateCity = (req, res) => {
    pool.query(
        'SELECT * FROM cities WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })            
            if (rows == false) return res.sendStatus(404)
            pool.query(
                `UPDATE cities SET name=? WHERE id=?`,
                [req.body.name, req.params.id],
                (err, rows) => {
                    if (err) return res.status(400).json({ err })            
                    res.status(200).json({ msg: 'City updated.'})
                }
            )
        }
    )
}

const deleteCity = (req, res) => {
    pool.query(
        'SELECT * FROM cities WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            pool.query(
                `DELETE FROM cities WHERE id=?`,
                [req.params.id],
                (err, result) => {
                    if (err) return res.status(400).json({ err })
                    res.status(200).json({ msg: 'City deleted.' })
                }
            )
        }
    )
}

module.exports = {
    getAllCities,
    addCity,
    getCityById,
    updateCity,
    deleteCity
}