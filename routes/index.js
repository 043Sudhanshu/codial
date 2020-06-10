const express=require("express");

const routes=express.Router();

const homecontroller=require('../controllers/home_controller');

routes.get('/',homecontroller.home);    

routes.use('/user',require('./user'));   /****   go to user router   *****/
module.exports=routes;

