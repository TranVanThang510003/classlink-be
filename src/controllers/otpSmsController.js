const { generateAndSendOtp, verifyOtp } = require("../services/otpSmsService");

// gửi OTP SMS
const sendOtpSms = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number is required" });

    const code = await generateAndSendOtp(phoneNumber);
    console.log(`OTP ${code} sent to ${phoneNumber}`);
    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

// xác thực OTP
const verifyOtpSmsController = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) return res.status(400).json({ message: "Phone number and code are required" });

    const isValid = await verifyOtp(phoneNumber, code);
    if (isValid) return res.json({ message: "OTP verified successfully" });

    return res.status(400).json({ message: "OTP incorrect or expired" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

module.exports = { sendOtpSms, verifyOtpSmsController };
