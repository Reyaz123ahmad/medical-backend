const mongoose=require('mongoose');


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        reqiured:true
    },
    speciality:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        // required:true
    },
    about:{
        type:String
    },
    rating:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
module.exports=mongoose.model('Doctor',doctorSchema)