const pool = require('../database/connection');
const validator = require('../controllers/validate');

const validateContact = (req, res, next) => {
    const rules = {
        "name": "required|string",
        "last_name": "required|string",
        "position": "required|string",
        "email": "required|email",
        "company_id": "required|integer",
        "city_id": "required|integer",
        "address": "required|string",
        "socials_id": "required|integer",
        "account": "required|string",
        "pref_id": "required|integer"
    }
    validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({ err })
        }
        next()
    })
}

const addContact = (req, res) => {
    const { name, 
        last_name, 
        position,
        email, 
        company_id, 
        city_id, 
        address, 
        socials_id,
        account,
        pref_id } = req.body;
    pool.query(
        'SELECT * FROM contacts WHERE email=?',
        [email],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows != false) return res.status(400).json({ msg: 'Contact already exists.'})
            pool.query(
                `INSERT INTO contacts (name, last_name, position, email, company_id,
                    city_id, address, socials_id, account, pref_id)
                    VALUES (?,?,?,?,?,?,?,?,?,?)`,
                [name, last_name, position, email, company_id, city_id, address, 
                    socials_id, account, pref_id],
                (err) => {
                    if (err) return res.status(400).json(err)
                    res.status(201).json({ msg: `${name} added.` })
                }
            )
        }
    )
}

const getContacts = (req,res) => {
    pool.query(
        `SELECT
        ct.name, 
        ct.last_name,
        ct.position,
        ct. email,
        cp.name AS company,
        ci.name AS city,
        co.name AS country,
        r.name AS region,
        ct.address,
        so.name AS social,
        ct.account,    
        pr.name AS preference        
        FROM contacts ct
        LEFT JOIN companies cp ON ct.company_id = cp.id
        LEFT JOIN cities ci ON ct.city_id = ci.id
        LEFT JOIN countries co ON ci.country_id = co.id
        LEFT JOIN regions r ON co.region_id = r.id
        LEFT JOIN socials so ON ct.socials_id = so.id
        LEFT JOIN preferences pr ON ct.pref_id = pr.id`,
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) return res.status(404).json({ msg: 'No contacts added yet.'})
            res.status(200).json(rows)
        }
    )
}

const getContactById = (req,res) => {
    pool.query(
        `SELECT
        ct.name, 
        ct.last_name,
        ct.position,
        ct. email,
        cp.name AS company,
        ci.name AS city,
        co.name AS country,
        r.name AS region,
        ct.address,
        so.name AS social,
        ct.account,    
        pr.name AS preference        
        FROM contacts ct
        LEFT JOIN companies cp ON ct.company_id = cp.id
        LEFT JOIN cities ci ON ct.city_id = ci.id
        LEFT JOIN countries co ON ci.country_id = co.id
        LEFT JOIN regions r ON co.region_id = r.id
        LEFT JOIN socials so ON ct.socials_id = so.id
        LEFT JOIN preferences pr ON ct.pref_id = pr.id
        WHERE ct.id=?`,
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) return res.sendStatus(404)
            res.status(200).json(rows[0])
        }
    )
}

const updateContact = (req, res) => {
    const { name, 
        last_name, 
        position,
        email, 
        company_id, 
        city_id, 
        address, 
        socials_id,
        account,
        pref_id } = req.body;
    pool.query(
        'SELECT * FROM contacts WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) return res.sendStatus(404)
            pool.query(
                `UPDATE contacts
                SET name=?, last_name=?, position=?, email=?, company_id=?, city_id=?, 
                address=?, socials_id=?, account=?, pref_id=?
                WHERE id=?
                `,
                [name, last_name, position, email, company_id, city_id, 
                    address, socials_id, account, pref_id, req.params.id],
                (err) => {
                    if (err) return res.status(400).json(err)
                    res.status(200).json({ msg: 'Contact updated.'})
                }
            )
        }
    )
}

const deleteContact = (req, res) => {
    pool.query(
        'SELECT * FROM contacts WHERE id=?',
        [req.params.id],
        (err, rows) => {
            if (err) return res.status(400).json(err)
            if (rows == false) return res.sendStatus(404)
            pool.query(
                'DELETE FROM contacts WHERE id=?',
                [req.params.id],
                (err) => {
                    if (err) return res.status(400).json(err)
                    res.status(200).json({ msg: 'Contact deleted.'})
                }
            )
        }
    )
}

module.exports = {
    validateContact,
    addContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
}