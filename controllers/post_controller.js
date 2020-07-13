const POST=require('../model/post');

const Comment=require('../model/comments');

module.exports.create=async function(req,res){
  
     let post=await POST.create({content:req.body.content  , user:req.user._id });
     req.flash('success','post published!');
  
     return res.redirect('back');  
  
     // POST.create({
    //     content:req.body.content,
    //     user:req.user._id
    // },function(err,Post){
    //   if(err){console.log("error in creating post"); return;}
    //   return res.redirect('back');
    // });
}

module.exports.destroy=async function(req,res){                  // async
 
   let post=await POST.findById(req.params.id);                  // await
          
     try{
            if(post && post.user==req.user.id){
              
              post.remove();

         Comment.deleteMany(req.params.id,function(){});           // await
               req.flash('success','post deleted!');
               return res.redirect('back');
                
              }
           else{
                  return res.redirect('back');
                }
        }
     catch(err){
            console.log("error while destroying the post",err);
            return;
     }

  // POST.findById(req.params.id,function(err,post){
   
  //   //instead of doing req.user._id we are doing .id because we need convert it into string

  //   if(post.user==req.user.id){     // we will check whether the post done by the user is the user who making the request
  //   if(post){
  //     post.remove();                     //deleting the whole post related to the req param id
  //     Comment.deleteMany(req.params.id,function(err){     //deleting the comments having the recieved post id
  //     }); 
  //     return res.redirect('back');
  //   }
  //   else{
  //     return res.redirect('back');
  //   }
  // }
  // });
  
}