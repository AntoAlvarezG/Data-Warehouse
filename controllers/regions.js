const pool = require('../database/connection');
const validator = require('./validate');

const validateRegion = (req, res, next) => {
    const rules = {
        "name": "required|string",
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ err })
        }
        next()
    })
}

const getAllRegions = (req, res) => {
    pool.query(
        'SELECT * FROM regions',
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) {
                return res.status(404).json({ msg: 'No regions added yet.' })
            }
            res.status(200).json(rows)
        }
    )
}

const addRegion = (req, res) => {
    pool.query(
        `SELECT name FROM regions WHERE name=?`,
        [req.body.name],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows != false) {
                return res.status(400).json({ msg: 'Region already exists.' })
            }
            pool.query(
                `INSERT INTO regions (name) VALUES (?)`,
                [req.body.name],
                (err) => {
                    if (err) return res.status(400).json({ err })
                    res.status(201).json({ msg: 'Region added.' })
                }
            )
        }
    )
}

const getRegionById = (req, res) => {
    pool.query(
        'SELECT * FROM regions WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.sendStatus(404)
            res.status(200).json(rows[0])
        }
    )
}

const updateRegion = (req, res) => {
    pool.query(
        'SELECT * FROM regions WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err }) 
            if (rows == false) return res.sendStatus(404)
            pool.query(
                'UPDATE regions SET name=? WHERE id=?',
                [req.body.name, req.params.id],
                (err) => {
                    if (err) return res.status(400).json({ err })            
                    res.status(200).json({ msg: 'Region updated.'})
                }
            )
        }
    )
}

const deleteRegion = (req, res) => {
    pool.query(
        'SELECT * FROM regions WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err }) 
            if (rows == false) return res.sendStatus(404)
            pool.query(
                'DELETE FROM regions WHERE id=?',
                [req.params.id],
                (err, result) => {
                    if (err) return res.status(400).json({ err })
                    res.status(200).json({ msg: 'Region deleted.' })
                }
            )
        }
    )
}

const getLocation = (req, res) => {
    pool.query(
        `SELECT * FROM regions AS r
        LEFT JOIN countries AS co
        ON r.id = co.region_id
        LEFT JOIN cities AS ci
        ON co.id = ci.country_id
        WHERE r.id=?`,
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json({ err })
            if (rows == false) return res.status(404).json({ msg: 'Not found.'})
            res.status(200).json(rows)
        }
    )
}

module.exports = {
    getAllRegions,
    addRegion,
    getRegionById,
    updateRegion,
    deleteRegion,
    validateRegion,
    getLocation
}