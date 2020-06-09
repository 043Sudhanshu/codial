const express=require("express");

const routes=express.Router();

const homecontroller=require('../contorllers/home_controller');

routes.get('/',homecontroller.home);

module.exports=routes;

