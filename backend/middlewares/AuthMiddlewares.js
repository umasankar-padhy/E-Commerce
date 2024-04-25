const JWT = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// Middleware for protecting routes with a token
exports.requireSignIn = function (req, res, next) {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Unauthorized Access",
        });
    }
};

// Middleware for checking admin access
exports.isAdmin = async function (req, res, next) {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access...........",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
