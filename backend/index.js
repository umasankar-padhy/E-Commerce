

// Import required modules
const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const dbConnect = require("./config/database");

// Load environment variables from a .env file
dotenv.config();

// Define the port for the server to listen on
const PORT = process.env.PORT || 4000;

// Set up middleware
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies

// Define a route for the homepage
app.get("/", (req, res) => {
    res.send("<h2>Welcome to the homepage</h2>");
});

// Import and user routes
const  authRoutes = require("./routes/authRoutes");
app.use("/api/v1", authRoutes); 

// Import and category routes
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/v1/category", categoryRoutes);


const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/product", productRoutes);

// Connect to the database
dbConnect();

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
