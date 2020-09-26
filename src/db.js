const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB,{
    useUnifiedTopology:true,
    useNewUrlParser: true
})
    .then(db => console.log('DB connected'))
    .catch( err => console.log('ERROR DB', err))

module.exports = mongoose