const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' })
}

// login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.loginUser(email, password);
        const token = createToken(user._id);
        res.status(200).json({
            email,
            token
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// signup (create) user
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signupUser(email, password);
        const token = createToken(user._id);
        res.status(200).json({
            email,
            token
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { login, signup }