const express =  require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { join } = require('path')

require('./helpers/passport')

// init
const app = express()

// settings
app.set('port', process.env.PORT || 3000)
app.set('views',join(__dirname,'views'))
app.engine('.hbs', exphbs({
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir: join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// mids
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(session({
    secret: 'wubbalubbadubdub',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use( (req,res,next) => {
    res.locals.success = req.flash('success')
    res.locals.fail = req.flash('fail')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})


// routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/users.routes'))
app.use(require('./routes/privates.routes'))


// statics files
app.use(express.static(join(__dirname,'public')))

app.get('*', (req, res) => {
    res.status(404).render('404')
})

module.exports = app