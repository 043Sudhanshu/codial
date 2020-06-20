
module.exports.profile=function(req,res){
    res.render('profile',{title:"profile"});
}
module.exports.create=function(req,res){
   
    
    
}
module.exports.signup=function(req,res){

    res.render('user_sign_up',{title:"signup"});
}

module.exports.createsession=function(req,res){
    
    res.render('user_sign_in',{title:"signin"});
}


