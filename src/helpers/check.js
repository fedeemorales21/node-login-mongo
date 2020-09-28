const check = {}

check.checkPermission = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    req.flash('fail','Login first')
    res.redirect('login')    
}

module.exports = check