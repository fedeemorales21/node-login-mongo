const express =  require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')

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


// routes
app.use(require('./routes/index.routes'))


// statics files
app.use(express.static(join(__dirname,'public')))

app.get('*', (req, res) => {
    res.status(404).render('404')
})



module.exports = app