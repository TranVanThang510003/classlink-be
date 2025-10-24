const {
  sendOtpLoginService,
  verifyOtpLoginService,
} = require("../services/authService");

// 📩 Gửi mã OTP đăng nhập
const sendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Vui lòng nhập email",
      });
    }

    const data = await sendOtpLoginService(email);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error("Send login OTP error:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Lỗi hệ thống khi gửi OTP",
    });
  }
};

// ✅ Xác thực mã OTP đăng nhập
const verifyLoginOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Vui lòng nhập đầy đủ email và mã OTP",
      });
    }

    const data = await verifyOtpLoginService(email, code);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    console.error("Verify login OTP error:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Lỗi hệ thống khi xác thực OTP",
    });
  }
};

module.exports = {
  sendLoginOtp,
  verifyLoginOtp,
};
