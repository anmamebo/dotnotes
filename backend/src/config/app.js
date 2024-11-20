const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(morgan("dev")); // To log the requests in the console
app.use(express.json()); // To parse the body of the request message
app.use(cors()); // To allow requests from other origins

// Routes
const authRoutes = require("../routes/auth.routes");
const noteRoutes = require("../routes/note.routes");

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

module.exports = app;
