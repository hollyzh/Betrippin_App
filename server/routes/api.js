const express = require ('express')
const router = express.Router()

router.use('/googleApi', require('./googleApi'))
router.use('/betrippins', require('./betrippins'))

module.exports = router;
