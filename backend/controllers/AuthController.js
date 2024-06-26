const userModel = require("../../../E-Commerce/backend/models/UserModel");
const orderModel = require("../../../E-Commerce/backend/models/orderModel");
const { hashPassword, comparePassword } = require("../../../E-Commerce/backend/utils/AuthUtil");
const JWT = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

// Register Controller
exports.registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address ,answer} = req.body;

        // Validations
        if (!name) {
            return res.json({ message: "Name is Required" });
        }
        if (!email) {
            return res.json({ message: "Email is Required" });
        }
        if (!password) {
            return res.json({ message: "Password is Required" });
        }
        if (!phone) {
            return res.json({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.json({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "Already Registered, please login",
            });
        }

        // Register the user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in Registration",
            success: false,
            error,
        });
    }
};

// Login Controller
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).json({ 
                success: false,
            message: "Invalid email or password" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "Email is not registered" });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).json({ 
                success: false, 
                message: "Invalid Password" });
        }

        // Generate a JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,

            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error,
        });
    }
};




//forgotPasswordController

exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};

//test controller
exports.testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};


//update prfole
exports.updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};




//orders
exports.getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
//orders
exports.getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
exports.orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};
