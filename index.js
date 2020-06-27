const express=require('express');             
const app=express();                        /********** setting express server ***********/
const port=8000;
const expresslayouts=require('express-ejs-layouts');   /**require layouts before this do npm install express-ejs-layouts ******/

const db=require('./config/mongoose');

                // used for session cookie

const session = require('express-session');        /********encrypt session cookie******/
const passport = require('passport');
const passportLocal = require('./config/passport');

            /***************parse form data***************************/

app.use(express.urlencoded());
             /*****************cookie parser *****************/
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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
    resave:false,
    cookie:{
        maxAge:(1000*60*100)   //time in mili seconds
    }
}));
 
app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes'));                /******require route folder *******/







app.listen(port,function(err){                          /******server listening *********/
    if(err){
        console.log(`Error is coming: ${err}`);
        return;
    }
    console.log(`server is running at port:${port}`);
    return;
});
