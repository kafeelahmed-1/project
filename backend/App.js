const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());

app.use("/api", userRoutes);

connectDB();

app.listen(8005, () => {
  console.log("Server is running on http://localhost:8005");
});
