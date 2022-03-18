const router = require('express').Router()

const controller = require('../controllers/clusterController')

router
    .get('/blogs', controller.getBlogs)

    
module.exports = router