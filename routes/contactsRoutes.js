const express = require('express');
const router = express.Router();
const {
    validateContact,
    addContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} = require('../controllers/contacts');

// add new contact
router.post('/add', validateContact, addContact);

// get all contacts
router.get('/', getContacts);

// get contact by id
router.get('/:id', getContactById);

// update contact
router.put('/:id', validateContact, updateContact);

// delete contact
router.delete('/:id', deleteContact);

module.exports = router;