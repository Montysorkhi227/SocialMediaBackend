const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')
//allowed formates
const allowedFormates =['image/jpeg','image/png','image/jpeg','image/gif','image/svg','video/mp4','application/pdf','audio/mpeg']

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        resource_type:"auto",
        allowedFormates:['jpg','jpeg','png','svg','mp4','pdf','mp3'],
}
})
const filefiler =(req,res,cb)=>{
    if(allowedFormates.includes(file.mimetype))
    {
        cb(null,file)

    }
    else{
        cb(new Error('Unsupported File Type'),false)
    }
}
const upload=multer({storage,filefiler})
module.exports=upload