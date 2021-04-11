const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required:true
        },
        role:{
            type: String,
            default: "user",
            enum: ["user","admin","superadmin"]
        }
    },
    {timestamps: true}
)

module.exports = model("user", UserSchema)