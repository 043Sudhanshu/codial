const comment=require('../model/comments');
const post=require('../model/post');
/*** while creating comment we have to consider two things
 * 1. creating the comment array in post so that it can be accessed quickly 
 * 2. bcoz if we dont have array in post to show then
 *    then we have to go to the comment model or database to check every comments post id..
 *    comment schema have three things  comment,user,posts   comment is the content but the user contain user id and post 
 *    contains post id
 * --------->we will be creating at both the places
 */ 
module.exports.create=function(req,res){
  //we have to search for the post id first whether that post exist or not becoz someone can change post id in html
  //so we will check the post and then add comment to db,for that we have to require the post model
     
  post.findById(req.body.postsid,function(err,post){
   if(err){console.log("error in comment creation"); return;}
    if(post){         
    comment.create({
        comment:req.body.comment,      
         user:req.user._id,                      // when passport authenticates it puts the user in req.user all the time
         post:req.body.postsid                   //it goes only when the req.logout() happens on signout
        } ,function(err,comment){ 
            if(err){console.log('error in creating comment'); return;}
             post.comments.push(comment);   // automatically stores comment id in the array
             post.save();                   // save tells this is final version of change save it
             res.redirect('back');
    });
  }
});
}
    

module.exports.delete=function(req,res){
   
 comment.findById(req.params.id,function(err,comm){
 
  if(comm){  
       //  req.user.id is string and req.user._id is object...we will use the req.user.id to compare
    post.findById(comm.post,function(err,postuser){
      
      if(postuser.user== req.user.id || comm.user==req.user.id){
       
        let postid=comm.post;        //keeping it to delete the post because when we will delete the comm the post id in it will be lost
       
         comm.remove();
                 // we are updating,this pull is syntax we are removing or pulling the comment id from the comment array..
        post.findByIdAndUpdate(postid,{ $pull : {comments:comm.id} },function(err,post){
            return res.redirect('back');
        });
      }
  
      else{
      return res.redirect('back');
      }
  
   });
  }
  else{
    return res.redirect('back'); 
  }

  });
}
  
