const express=require('express');
const router=express.Router();

const passport=require('../config/passport');

const post_controller=require('../controllers/post_controller');
const { checkAuthentication } = require('../config/passport');

router.post('/create',passport.checkAuthentication,post_controller.create);

router.get('/destroy/:id',passport.checkAuthentication,post_controller.destroy);

module.exports=router;