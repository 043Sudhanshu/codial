const POST=require('../model/post');

const Comment=require('../model/comments');

module.exports.create=function(req,res){
    POST.create({
        content:req.body.content,
        user:req.user._id
    },function(err,Post){
      if(err){console.log("error in creating post"); return;}
      return res.redirect('back');
    });
}

module.exports.destroy=function(req,res){

  POST.findById(req.params.id,function(err,post){
   
    //instead of doing req.user._id we are doing .id because we need convert it into string

    if(post.user==req.user.id){     // we will check whether the post done by the user is the user who making the request
     
    if(post){
      post.remove();                     //deleting the whole post related to the req param id
      Comment.deleteMany(req.params.id,function(err){     //deleting the comments having the recieved post id
      }); 
    
      return res.redirect('back');

    }
    else{
      return res.redirect('back');
    }
  }
  });
  
  
}