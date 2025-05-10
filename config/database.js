
const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        ssl:true,
        tls:true,
        
        socketTimeoutMS:3000
    })
    .then(()=>{
        console.log('DB connection is successful');
    })
    .catch((error)=>{
        console.log('Issue in DB connection')
        console.error(error.message)
        process.exit(1)
    })
}
module.exports=dbConnect;