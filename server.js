const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const studentRoutes = require("./src/routes/studentRoutes");
const otpRoutes = require("./src/routes/otpRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use("/api/otp", otpRoutes);
app.use("/api/students", studentRoutes);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
