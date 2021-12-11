const express = require('express');
const router = express.Router();
const {
    validateCompany,
    addCompany,
    getCompanies,
    updateCompany,
    deleteCompany
} = require('../controllers/companies');

// add new company
router.post('/add', validateCompany, addCompany);

// get all companies
router.get('/', getCompanies);

// update company info
router.put('/:id', validateCompany, updateCompany);

// delete company
router.delete('/:id', deleteCompany);

module.exports = router;