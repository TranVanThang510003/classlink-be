const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const studentRoutes = require("./src/routes/studentRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
