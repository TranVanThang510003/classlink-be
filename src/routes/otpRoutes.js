const express = require("express");
const { sendOtp, verifyOtpController } = require("../controllers/otpEmailController");
const { sendOtpSms, verifyOtpSmsController } = require("../controllers/otpSmsController");

const router = express.Router();

router.post("/send-otp-email", sendOtp);
router.post("/verify-otp-email", verifyOtpController);
router.post("/send-otp-sms", sendOtpSms);
router.post("/verify-otp-sms", verifyOtpSmsController);
module.exports = router;

