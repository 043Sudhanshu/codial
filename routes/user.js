const express=require('express');

const router=express.Router();

const user_controller=require('../controllers/user_controller.js');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,user_controller.profile);
router.post('/update/:id',passport.checkAuthentication,user_controller.update);
router.get('/signup',user_controller.signup);    
 router.get('/signin',user_controller.signin);
 router.get('/signout',user_controller.signout);
 router.post('/create',user_controller.create);
 router.post('/create_session',passport.authenticate(
     'local',                                                  //middleware
     {failureRedirect:'/user/signin'}
 ),user_controller.createsession);
  
 

module.exports=router;