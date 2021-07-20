const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {type: mongoose.Schema.Types.String, required: true, unique: true},
        password: {type: mongoose.Schema.Types.String, required: true},
    },
    {timestamps: true}
);


module.exports = mongoose.model("User", userSchema, "Users");
