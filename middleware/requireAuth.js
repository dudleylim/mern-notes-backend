const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// verifies if jwt from frontend is valid 
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === undefined) {
        return res.status(401).json({
            error: "Authorization token required"
        });
    }

    // assuming authorization is a string with format "Bearer <token>"
    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id: id }).select('_id');
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: "Request is not authorized" })
    }
}

module.exports = requireAuth;