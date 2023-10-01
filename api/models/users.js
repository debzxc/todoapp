const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false},
    role: {
        type: String,
        default: "Visitor"
    }
})

const UserModel = mongoose.model("users", UserSchema)

                                                                                                                                
module.exports = UserModel