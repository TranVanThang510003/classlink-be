const admin = require("../config/firebaseAdmin");
const { getUserByEmail } = require("./studentService");
const { generateAndSaveOtp, verifyOtp } = require("./otpEmailService");

// 1️⃣ Gửi OTP
const sendOtpLoginService = async (email) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: "Email không tồn tại trong hệ thống.",
      };
    }

    const otpInfo = await generateAndSaveOtp(email);

    if (otpInfo.reused) {
      return {
        success: true,
        statusCode: 200,
        message: `OTP vẫn còn hiệu lực (${otpInfo.expiresIn}s).`,
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Đã gửi mã OTP về email.",
    };
  } catch (error) {
    console.error("Send OTP error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi khi gửi OTP",
    };
  }
};

// 2️⃣ Xác thực OTP + đăng nhập Firebase
const verifyOtpLoginService = async (email, code) => {
  try {
    const isValid = await verifyOtp(email, code);
    if (!isValid) {
      return {
        success: false,
        statusCode: 400,
        message: "OTP không đúng hoặc đã hết hạn.",
      };
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: "Không tìm thấy user.",
      };
    }

    // 🔐 Firebase Custom Token
    const firebaseToken = await admin.auth().createCustomToken(user.id, {
      role: user.role,
      email: user.email,
      name: user.name,
    });

    return {
      success: true,
      statusCode: 200,
      message: "Đăng nhập thành công.",
      data: {
        firebaseToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    };
  } catch (error) {
    console.error("Verify OTP login error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi xác thực OTP.",
    };
  }
};

module.exports = {
  sendOtpLoginService,
  verifyOtpLoginService,
};
