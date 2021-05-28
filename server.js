// Core modules import
const express = require("express");
const path = require("path");
const cors = require("cors");

const commenteur = require("./routes/commenteur");

// Create server
const app = express();

// Enable CORS
app.use(cors());

// Parse request body
app.use(express.json());

// Static public dir config
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

//! APIs
app.use("/api/commenteur", commenteur);

// Server listen
const port = process.env.port || 3000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});