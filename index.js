const express=require('express');
const app=express();
const port=8000;

const expresslayouts=require('express-ejs-layouts');

app.use(expresslayouts);

app.set('view engine','ejs');
app.set('views','./view');


app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error is coming: ${err}`);
        return;
    }
    console.log(`server is running at port:${port}`);
    return;
});
