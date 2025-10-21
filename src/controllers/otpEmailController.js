const { generateAndSaveOtp, verifyOtp } = require("../services/otpEmailService");

// gửi OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const code = await generateAndSaveOtp(email);
    console.log(`OTP ${code} sent to ${email}`);
    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

// xác thực OTP
const verifyOtpController = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email and code are required" });

    const isValid = await verifyOtp(email, code);
    if (isValid) return res.json({ message: "OTP verified successfully" });

    return res.status(400).json({ message: "OTP incorrect or expired" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

module.exports = { sendOtp, verifyOtpController };
