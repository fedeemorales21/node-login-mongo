const check = {}

check.checkPermission = (req,res,next) => {
    if (req.checkPermission()) return next()
    res.redirect('/users/login')    
}

module.exports = check