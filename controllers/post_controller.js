const POST=require('../model/post');

module.exports.create=function(req,res){
    POST.create({
        content:req.body.content,
        user:req.user._id
    },function(err,Post){
      if(err){console.log("error in creating post"); return;}
      return res.redirect('back');
    });
}