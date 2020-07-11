const mongoose=require('mongoose');


const commentschema=new mongoose.Schema({

    // every comment has two things...... 1. which user did it      2.on which post

    comment:{
        type:String,
        required:true             // true means the comment cant be made until it is presented
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,    // stroing object id as refrence bcoz its unique
        ref:'User'                             //which model it is refering to // User is the name in database
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,    // storing object id of the post
        ref:'Post'                                 //which model it is refering to // User is the name in database
     }
},{timestamps:true});

const comment=mongoose.model('Comment',commentschema);

module.exports=comment;