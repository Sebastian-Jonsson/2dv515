const router = require('express').Router()

const controller = require('../controllers/recommendController')

router
    .get('/users', controller.getUsersList)

    .get('/tables', controller.getScoreTable)

    .post('/create', controller.postFunction)

    .put('/update', controller.putFunction)
    
    .delete('/:id', controller.deleteFunction)


module.exports = router