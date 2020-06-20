const express=require('express');

const router=express.Router();

const user_controller=require('../controllers/user_controller.js');

router.get('/profile',user_controller.profile);
router.get('/signup',user_controller.signup);    
 router.get('/signin',user_controller.createsession);
 router.post('/create',user_controller.create);
module.exports=router;