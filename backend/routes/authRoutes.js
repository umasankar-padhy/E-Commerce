const express = require("express");
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } = require("../controllers/AuthController");
const { requireSignIn, isAdmin } = require("../middlewares/AuthMiddlewares");

// Create a router object
const router = express.Router();

// Define the routes
// REGISTER (METHOD: POST)
router.post("/register", registerController);

// LOGIN (METHOD: POST)
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);


// Test route (protected with middleware)
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});


//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders 
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController

);


module.exports = router;
