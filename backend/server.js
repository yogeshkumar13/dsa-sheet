require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/progress", require("./routes/progress"));
 


app.listen(5000, () => console.log("Server running on 5000"));
