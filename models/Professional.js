const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
    name: String,
    hourPrice: Number,
    job: String,
    currency: String,
    rating: Number,
    description: String,
    zone: String,
    /* availability: {
        fullTime: Boolean,
        from: Number,
        to: Number
    }, */
    imgUrl: String,
    status: Boolean
})

module.exports = mongoose.model("Professional", professionalSchema);