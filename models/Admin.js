const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    admin: {
        type:String,
        requiered:true,
        unique:true,
    },
    password: {
        type:String,
        requiered:true
    }
})

//HASH
adminSchema.pre("save", function(next) {

    bcrypt.genSalt(10)
    .then(salt=> {
        bcrypt.hash(this.password, salt)
        .then(hash=> {
            this.password = hash;
            next();
        })
        .catch(err=> next(err));        
    })
    .catch(err=> next(err));

});

module.exports = mongoose.model("Admin", adminSchema);