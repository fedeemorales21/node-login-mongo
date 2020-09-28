const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use( 
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email,password, done) => {

        const user =  await User.findOne({email})
        if (!user) return done(null,false, {mgs: 'Email not registed yet'}) 

        const log = await user.comprarePassword(password)
        if (log){ 
            return done(null, user)
        }else{
            return done(null,false, {mgs: 'Password wrong'}) 
        }
    
    })
)

passport.serializeUser( (user, done) => done(null, user.id))

passport.deserializeUser( async (id, done) => {
    await User.findById( id , (err, user) => done(err,user) )
})