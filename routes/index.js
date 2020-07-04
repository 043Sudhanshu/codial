const express=require("express");

const routes=express.Router();

const homecontroller=require('../controllers/home_controller');
const router = require("./user");

routes.get('/',homecontroller.home);    
  /**this is url /user */
routes.use('/user',require('./user'));   /****   go to post router for all request having /user/..   *****/
/**this is url /post */
routes.use('/post',require('./post'));   /*** go to post router for all request having /post/..   */
/**this is url /comment */
routes.use('/comment',require('./comment'));   /*** go to post router for all request having /post/..   */


module.exports=routes;

