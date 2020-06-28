const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

/***************done function is callback function which passport uses, 
 done takes 2 arguments one is err and another is user or false  **************/
 
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){       
    done(null, user.id);                   /******sending cookie to browser by the id ******/
});
  


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){       /*****recieving cookie from the browser */
    User.findById(id, function(err, user){
        if(err){                                                      
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);                 /*********if user is found by the coming id*****/
    });
});

/***** check if user is authenticated  ****/
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
       next();
    }
    else{
        return res.redirect('signin');
    }

}
/***********  req.user contains the current signed in user from session cookie and we are just sending this to
 the locals for views
 *********/
passport.setAuthenticateduser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}


module.exports = passport;