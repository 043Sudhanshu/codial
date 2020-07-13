const post=require('../model/post');

const user=require('../model/user');

module.exports.home=async function(req,res){           //    Async
    
     try{
              let posts=await post.find({})             //    Await 1
                    .populate('user')
                    .populate({
                      path:'comments',
                      populate:{
                        path:'user'
                      }
                    });
              
              let users=await user.find({});            //    Await 2

              return res.render('home',{
                title:"codial | Home",
                posts:posts,
                all_user:users
              });
      }
        catch(err){
          console.log("Error",err);
          return;
        }
}
//at so many places we are pre populating the items in the posts because post is containing the refrences 
//and it has to populated before we use it

//   post.find({})
//   .populate('user')           // user is reference so we have to populate it 
//   .populate({                       
//     path:'comments',          //comment inside posts and path is user because they are more in quantity
//     populate:{
//       path:'user'            // user inside the comments having reference we have to populate it too
//     }
//   })
//   .exec(function(err,posts){                             // to populate the user inside the post who posted that we 
  
//     if(err){console.log("error in showing posts"); return;}       //we have to tell populate the user in post to by the line  
   
//   user.find({},function(err,users){

//     return res.render('home',
//     {title:"home",
//     posts:posts,
//     all_user:users
//      });     
  
//   });
   
//   });                      // exec is execute like the callback function above we have used
// }
