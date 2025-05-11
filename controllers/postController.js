const Post=require('../models/Post');
//creating post with media upload 
exports.createPost= async (req, res) =>{
    const{content}=req.body;
    const mediaFile=req.file;
    try{
const newPost=new Post({
    user:req.user._id,
    content
});
if(mediaFile)
{
    newPost.media={
        url:mediaFile.path,
        type:mediaFile.mimetype.split('/')[0]
    }
}await newPost.save();
return res.status(201).json({message:"Bdhai Ho ,Post Ho gyi"})
    }
    catch(error)
    {
        return res.status(500).json({message:error.message})
    }
}