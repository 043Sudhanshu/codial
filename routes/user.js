const express=require('express');

const router=express.Router();

const user_controller=require('../controllers/user_controller.js');
const passport = require('passport');

router.get('/profile',user_controller.profile);
router.get('/signup',user_controller.signup);    
 router.get('/signin',user_controller.signin);
 router.post('/create',user_controller.create);
 router.post('/create_session',passport.authenticate(
     'local',
     {failureRedirect:'/user/signin'}
 ),user_controller.createsession);


module.exports=router;