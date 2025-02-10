const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
    bannerName : {
        type : String,
        required : true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});
const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;