
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
		required: true
    },
    comments: {
        type: [String],
        required: true
    }
})

const ImageSchema = mongoose.Schema({
    image_id: {
        type: String,
        require: true
    },
    image_url: {
        type: String,
        required: true
    },
});

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String, 
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    location:{
        type: String, 
        required: true,
    },
    image: ImageSchema,
    all_comments:[CommentSchema]
    
})


const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };