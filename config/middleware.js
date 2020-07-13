module.exports.setflash=function(req,res,next){
    res.locals.flas={
        'success':req.flash('success'),       //copying success and value of req to locals
        'error':req.flash('error')
    }
    next();
}