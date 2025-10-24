const express = require("express");
const router = express.Router();
const {
  sendLoginOtp,
  verifyLoginOtp,
} = require("../controllers/authController");

// Gửi mã OTP đăng nhập (học sinh nhập email)
router.post("/login/send-otp", sendLoginOtp);

// Xác thực mã OTP (học sinh nhập mã vừa nhận được)
router.post("/login/verify-otp", verifyLoginOtp);

module.exports = router;
