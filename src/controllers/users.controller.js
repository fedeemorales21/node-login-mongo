const passport = require('passport')

const usersController = {}

const User = require('../models/User')


usersController.renderLogin = (req,res) => res.render('users/login')

usersController.signIn = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: 'privates/main',
    failureFlash: true
})

usersController.logout = (req,res) =>{
    req.logout()
    req.flash('success', 'Goodbye')
    res.redirect('/users/login')
}

usersController.renderRegister = (req,res) => res.render('users/register')

usersController.signUp = async (req,res) => {
    const { name,email,password,password_check } = req.body
    const errs = []

    // validation

    if (!name || !email || !password ) {
        errs.push({value: 'Complete fields please'})
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email.toLowerCase())) {
        errs.push({value:'Invalid Email'})
    }

    if (password.length > 6) {
        errs.push({value:'Password is too short, 6 characters minimum'})
    }

    if (password != password_check) {
        errs.push({value:'Reaply password is wrong'})
    }
    
    if (errs.length > 0) {
        res.render('users/register', { 
            errs,
            name,
            email,
            password
        })
    }

    const userEmail = User.findOne({email})
    if (userEmail) {
        req.flash('fail', 'Email already registered')
        res.render('users/register', { 
            name,
            password,
            password_check
        })
    }

    const newUser = new User({name,email,password})
    newUser.password = await newUser.hashingPassword(password)
    await newUser.save()
    req.flash('success','User Created')
    res.redirect('users/login')
}

module.exports = usersController