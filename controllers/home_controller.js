const post=require('../model/post');

module.exports.home=function(req,res){
    
    //   post.find({},function(err,posts){                                //we were not able to populate user by this in the home.ejs
    //   if(err){console.log("error in showing all the posts"); return;}   /// it was showing the id only 
          
    //  return res.render('home',{title:"home",posts:posts});
    // });

  post.find({}).populate('user').exec(function(err,posts){       // to populate the user inside the post who posted that we 
   if(err){console.log("error in showing posts"); return;}       //we have to tell populate the user in post to by the line  
    return res.render('home',{title:"home",posts:posts});     // populate('user') pre-populates the user 
  });                                                         // exec is execute like the callback function above we have used
}
