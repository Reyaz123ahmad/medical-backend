const express=require('express');
const cors=require('cors')
const app =express();
const dbConnect=require('./config/database');
const medicalRouter=require('./routes/doctor')
const fileUpload=require('express-fileupload')
const cloudinary=require('./config/cloudinary')

require('dotenv').config();

const PORT=process.env.PORT || 4000;
dbConnect();
cloudinary.cloudinaryConnect();
app.use(express.json());


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/temp/'
}))

app.use(cors());
app.use(express.json());

app.use("/api/v1",medicalRouter)

app.listen(PORT,()=>{
    console.log('app started at 3000 port')
});
app.get('/',(req,res)=>{
    console.log('this is home route')
    res.send('you are reach at home route successfully')
})
