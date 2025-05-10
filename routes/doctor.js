const express=require('express')
const router=express.Router()

// import controller

const {createDoctor,getDoctors}=require('../controllers/DoctorController');

// create mapping

router.post('/doctor/create',createDoctor);
router.get('/doctors/fetch',getDoctors);

module.exports=router;