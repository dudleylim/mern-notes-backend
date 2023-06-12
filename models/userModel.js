const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.statics.loginUser = async function(email, password) {
    // check fields
    if (!email || !password) {
        throw Error("Missing field(s)");
    }

    // find existing email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("User does not exist");
    }
    
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // return user/error
    if (isMatch) {
        return user
    } else {
        throw Error("Wrong password");
    }
}

userSchema.statics.signupUser = async function(email, password) {
    // check/validate fields
    if (!email || !password) {
        throw Error("Missing field(s)");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    // check for existing email
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email is already in use");
    }

    // create salt
    const salt = await bcrypt.genSalt(10);

    // create hash
    const hash = await bcrypt.hash(password, salt);
    
    // return user/error
    try {
        const user = await this.create({
            email,
            password: hash
        });
        return user;
    } catch (error) {
        throw Error("User signup failed");
    }
}

module.exports = mongoose.model('User', userSchema);