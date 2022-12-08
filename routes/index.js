const express = require('express')
const router = express.Router()
const {rumahSakit, filterRs} = require('../controllers/index')

router.route('/api/rumah-sakit')
    .get(rumahSakit)

router.route('/api/filter-rumah-sakit/:provinsi/:kota/:type')
    .get(filterRs)


module.exports = router