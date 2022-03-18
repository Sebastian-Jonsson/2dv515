const router = require('express').Router()

const controller = require('../controllers/searchEngineController')

router
    .get('/search', controller.getSearch)

    
module.exports = router