const { Router } = require('express')
const router = Router()

const { 
    renderLogin,
    signIn,
    logout,
    renderRegister,
    signUp
} = require('../controllers/users.controller')

router.get('/login', renderLogin )

router.post('/signin', signIn)

router.post('/logout', logout)

router.get('/register', renderRegister)

router.post('/signup', signUp)

module.exports = router