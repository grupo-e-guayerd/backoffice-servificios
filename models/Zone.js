const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
    zone: String
})

module.exports = mongoose.model("Zone", zoneSchema);