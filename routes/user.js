const express=require('express');

const router=express.Router();

const user_controller=require('../controllers/user_controller.js');

router.get('/profile',user_controller.profile);

module.exports=router;