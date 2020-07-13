const express=require('express');             
const app=express();                        /********** setting express server ***********/
const port=8000;
const expresslayouts=require('express-ejs-layouts');   /**require layouts before this do npm install express-ejs-layouts ******/
const db=require('./config/mongoose');   
                // used for session cookie
const session = require('express-session');        /********encrypt session cookie******/
const passport = require('passport');
const passportLocal = require('./config/passport');
             //mongo store to save seesions or cookie of users
 const Mongostore=require('connect-mongo')(session);
//***** sassmiddle ware to convert the sass code into css code because browser do not understand sass ******//
 const sassmiddleware=require('node-sass-middleware');
 app.use(sassmiddleware({
     src:'./assets/sass',
     dest:'./assets/css',
     debug:true,
     outputStyle:'extended',
     prefix:'/css'
 }));
            /***************parse form data***************************/
app.use(express.urlencoded());
             /*****************cookie parser *****************/
const cookieParser = require('cookie-parser');
app.use(cookieParser());
     /*************** flash messages**********/
     const flash=require('connect-flash');
     const customMware=require('./config/middleware');     

/******************   assets  layout views  ********/
app.use(express.static('./assets'));
app.use(expresslayouts);              /********use layout******/
app.set('layout extractStyles',true);          /********* to extract styles and scripts to layout and render *********/
app.set('layout extractScripts',true);
app.set('view engine','ejs');           /*******ejs view, npm install ejs *********/
app.set('views','./view');                    
/******************   when session is created the cookie is encrypted     *******************/
app.use(session({
    name:'codial',
     // TODO change the secret before deployment in production mode
    secret:'blahblah',
    saveUnintialized:false,         
    resave:false,                   //we dont want to save cookie data again and again 
    cookie:{
        maxAge:(1000*60*100)         //cookie age in millisec
    },
    store: new Mongostore({         //we stored it in Mongostore above created that here in the session bcoz it stores session cookies
        mongooseConnection:db,     //it will store these cookies in the db mongoose
        autoremove:'disabled'     // it wont remove the cookie 
    },function(err){
        console.log(err || 'connected to db');
    })
}));
 
app.use(passport.initialize());        
app.use(passport.session());            //express-session uses passport to encrypt and decrypt 

app.use(passport.setAuthenticateduser);      //making user available to ejs file
console.log('In index');
app.use(flash());
app.use(customMware.setflash);

app.use('/',require('./routes'));                /******require route folder *******/


app.listen(port,function(err){                          /******server listening *********/
    if(err){
        console.log(`Error-is coming: ${err}`);
        return;
    }
    console.log(`server is running at port:${port}`);
    return;
});
