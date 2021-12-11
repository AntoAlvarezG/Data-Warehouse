const Validator = require('validatorjs');

const validator = (data, rules, errMsgs, cb) => {
    const validation = new Validator(data, rules, errMsgs);
    // if success
    validation.passes( () => {
        cb(null, true)
    })
    // if validation errors
    validation.fails( () => {
        cb(validation.errors, false)
    })
}

module.exports = validator