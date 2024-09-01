// Import necessary modules
const express = require("express"); // Import the Express.js framework for building web applications
const mongoose = require("mongoose"); // Import Mongoose for interacting with MongoDB
const cookieParser = require("cookie-parser"); // Import cookie-parser to parse cookies in incoming requests
const cors = require("cors"); // Cross-Origin Resource Sharing
const authRouter = require("./routes/auth/auth-routes");
// Connect to MongoDB using Mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.onvc1.mongodb.net/`
    // Connection string to your MongoDB Atlas cluster, replace this with your actual database URI
  )
  .then(() => console.log("Connected to MongoDB")) // Log a success message if the connection is successful
  .catch((error) => console.log(error)); // Log any errors if the connection fails

// Create an Express app
const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 5000; // Set the port for the server to listen on (from environment variable or default to 5000)

// Set up CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin (frontend URL)
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ], // Allowed headers in the requests
    credentials: true, // Allow credentials (e.g., cookies) to be sent in requests
  })
);
// Use cookie-parser middleware
app.use(cookieParser()); // This middleware will parse cookies attached to the client request

// Use JSON parser middleware
app.use(express.json()); // This middleware will parse incoming JSON requests

// Use the auth router
app.use("/api/auth", authRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// The server will start and listen for incoming requests on the specified port
