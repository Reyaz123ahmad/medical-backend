const Doctor = require('../models/Doctor');
const cloudinary=require('cloudinary').v2

// Add a new doctor

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type)
}
async function uploadFileToCloudinary(file,folder,quality,width,height) {
    const options={folder};

    console.log('temp file path',file.tempFilePath)
    if(quality){
        options.quality=quality
    }
    if(width){
        options.width=width
    }
    if(height){
        options.height=height
    }
    options.resource_type='auto'
    return await cloudinary.uploader.upload(file.tempFilePath,options)
    
}


// image upload handler

exports.createDoctor=async(req ,res)=>{
    try{
        // fetch the data from req body

        const {name,speciality,experience,location,price,about,imageUrl,rating}=req.body;
        console.log('name,speciality,experience,location,price,about,imageUrl,rating',name,speciality,experience,location,price,about,imageUrl,rating)
        const file=req.files.imageFile
        console.log(file)

        // validation

        const supportedTypes=['jpg','jpeg','png']
        const fileType=file.name.split('.')[1].toLowerCase()
        console.log('fileType',fileType)
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File formate is not supported'
            })

        }

        // if file format supported

        console.log('uploading to medical')
        const response= await uploadFileToCloudinary(file,'Medical')
        console.log(response)

        // now save the entry into db

        const fileData=await Doctor.create({
            name,speciality,experience,location,price,about,rating,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            data:fileData,
            imageUrl:response.secure_url,
            message:'Image successfully uploaded'
        })
    }catch(error){
        console.log(error)
        console.error(error)
        return res.status(400).json({
            success:false,
            message:error.message,
            message:'something went wrong'
        })
    }
}





    


// list doctors with filter
exports.getDoctors = async(req ,res)=>{
    try{
      const { specialty, location, experience, rating, page = 1, limit = 10 } = req.query;
    
      const filters = {};
      if (specialty) filters.specialty = specialty;
      if (location) filters.location = new RegExp(location, 'i');
      if (experience) filters.experience = { $gte: parseInt(experience) };
      if (rating) filters.rating = { $gte: parseFloat(rating) };
    
      const skip = (page - 1) * limit;
        
      const doctors = await Doctor.find(filters)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });
      
      const total = await Doctor.countDocuments(filters);
    
    res.json({
      doctors,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
            message:'Internal server error'
        })
    }
}
// router.post('/add-doctor', async (req, res) => {
//   try {
//     const doctor = new Doctor(req.body);
//     await doctor.save();
//     res.status(201).json(doctor);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// List doctors with filters
// router.get('/list-doctor-with-filter', async (req, res) => {
//   try {
//     const { specialty, location, experience, rating, page = 1, limit = 10 } = req.query;
    
//     const filters = {};
//     if (specialty) filters.specialty = specialty;
//     if (location) filters.location = new RegExp(location, 'i');
//     if (experience) filters.experience = { $gte: parseInt(experience) };
//     if (rating) filters.rating = { $gte: parseFloat(rating) };
    
//     const skip = (page - 1) * limit;
    
//     const doctors = await Doctor.find(filters)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .sort({ rating: -1 });
      
//     const total = await Doctor.countDocuments(filters);
    
//     res.json({
//       doctors,
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / limit)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


