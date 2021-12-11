const express = require('express');
const router = express.Router();

const {
    getAllRegions,
    addRegion,
    getRegionById,
    updateRegion,
    deleteRegion,
    validateRegion,
    getLocation
} = require('../controllers/regions');

const {
    getAllCountries,
    addCountry,
    updateCountry,
    deleteCountry,
    getCountryById
} = require('../controllers/countries');

const {
    getAllCities,
    addCity,
    updateCity,
    deleteCity,
    getCityById
} = require('../controllers/cities');

// get complete location info
router.get('/complete/:id', getLocation);

// regions crud
router.get('/', getAllRegions);
router.post('/add', validateRegion, addRegion);
router.get('/:id', getRegionById);
router.put('/:id', validateRegion, updateRegion);
router.delete('/:id', deleteRegion);

// countries crud
router.get('/:region_id/countries', getAllCountries);
router.post('/:region_id/countries/add', validateRegion, addCountry);
router.get('/:region_id/countries/:id', getCountryById);
router.put('/:region_id/countries/:id', validateRegion, updateCountry);
router.delete('/:region_id/countries/:id', deleteCountry);

// cities crud
router.get('/:country_id/cities', getAllCities);
router.post('/:country_id/cities/add', validateRegion, addCity);
router.get('/:country_id/cities/:id', getCityById);
router.put('/:country_id/cities/:id', validateRegion, updateCity);
router.delete('/:country_id/cities/:id', deleteCity);
 
module.exports = router;