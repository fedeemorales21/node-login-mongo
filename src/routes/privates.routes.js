const { Router } = require('express')
const router = Router()

const { checkPermission } = require('../helpers/check')

const { renderPrivate } = require('../controllers/private.controller')

router.get('/private', checkPermission , renderPrivate)

module.exports = router