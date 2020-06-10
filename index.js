const express=require('express');
const app=express();                        /********** setting express server ***********/
const port=8000;

const db=require('./config/mongoose');

const expresslayouts=require('express-ejs-layouts'); /**require layouts before this do npm install express-ejs-layouts ******/

app.use(expresslayouts);              /********use layout******/

app.set('layout extractStyles',true);          /********* to extract styles and scripts to layout and render *********/
app.set('layout extractScripts',true);

app.use(express.static('./assets'));

app.set('view engine','ejs');           /*******ejs view, npm install ejs *********/
app.set('views','./view');                    



app.use('/',require('./routes'));                /******require route folder *******/














app.listen(port,function(err){                          /******server listening *********/
    if(err){
        console.log(`Error is coming: ${err}`);
        return;
    }
    console.log(`server is running at port:${port}`);
    return;
});
