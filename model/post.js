const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,    // stroing object id as refrence bcoz its unique
        ref:'User'    //which modelit is refering to

    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,    // stroing object id as refrence bcoz its unique
            ref:'Comment'    //which modelit is refering to
        }
    ]
},{timestamps:true});

const post=mongoose.model('Post',postschema);

module.exports=post;