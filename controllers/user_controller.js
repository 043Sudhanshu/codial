const User=require('../model/user');
module.exports.profile=function(req,res){
    res.render('profile',{title:"profile"});
}
module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
      res.redirect('back');
   }
   else{
    User.findOne({email:req.body.email},function(err,data){
        if(err){console.log("user finding error:"+err); return;}
        if(!data){
         User.create(req.body,function(err,user){
             if(err){console.log("error in creating user"); return;}
             res.render('user_sign_in',{title:"signin"});
         });
        }
        else{
        console.log("this username exists");
        return;
        }
        });
    }

    }   

    module.exports.signin=function(req,res){
    
        return   res.render('user_sign_in',{title:"signin"});
       
       }

module.exports.signup=function(req,res){
    
 return   res.render('user_sign_up',{title:"signup"});

}

module.exports.createsession=function(req,res){
    
 return   res.redirect('/');
}


