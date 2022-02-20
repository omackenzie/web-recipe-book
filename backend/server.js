const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const port = 5000;

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/recipes", require("./routes/recipeRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
