const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    },
    googleId: {
        type: String
    }
}, { timestamps: true });

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this.id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET_KEY, { expiresIn: "24d" });
    return token;
}

module.exports.User = model('User', userSchema);