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

const ProposalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true},
    title: {
        type: String, 
        required: true,
        
    },
    location: {
        type: String, 
        required: true,
        
    },
    numPeople: {
        type: Number, 
        required: true,
    },
    additionalInfo: String,
    image: ImageSchema,
    all_comments:[CommentSchema],
    joinedPeople: [mongoose.Schema.Types.ObjectId],
})

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = { Proposal };