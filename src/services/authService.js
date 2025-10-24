const jwt = require("jsonwebtoken");
const { getStudentByEmail } = require("./studentService");
const { generateAndSaveOtp, verifyOtp } = require("./otpEmailService");

const SECRET_KEY = process.env.JWT_SECRET;

// 1️⃣ Gửi OTP
const sendOtpLoginService = async (email) => {
  try {
    // Kiểm tra học sinh tồn tại
    const student = await getStudentByEmail(email);
    if (!student) {
      return {
        success: false,
        statusCode: 404,
        message: "Email không tồn tại trong hệ thống. Vui lòng liên hệ giáo viên.",
      };
    }

    // Tạo OTP và gửi mail
    const otpInfo = await generateAndSaveOtp(email);

    if (otpInfo.reused) {
      return {
        success: true,
        statusCode: 200,
        message: `OTP vẫn còn hiệu lực (${otpInfo.expiresIn}s). Vui lòng kiểm tra email của bạn.`,
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: "Đã gửi mã OTP về email của bạn.",
    };
  } catch (error) {
    console.error("Send OTP error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi khi gửi mã OTP. Vui lòng thử lại.",
    };
  }
};

// 2️⃣ Xác thực OTP và đăng nhập
const verifyOtpLoginService = async (email, code) => {
  try {
    // Kiểm tra mã OTP
    const isValid = await verifyOtp(email, code);
    if (!isValid) {
      return {
        success: false,
        statusCode: 400,
        message: "Mã OTP không đúng hoặc đã hết hạn.",
      };
    }

    // Lấy thông tin học sinh
    const student = await getStudentByEmail(email);
    if (!student) {
      return {
        success: false,
        statusCode: 404,
        message: "Không tìm thấy thông tin học sinh.",
      };
    }

    // Tạo JWT token
    const payload = {
      id: student._id,
      email: student.email,
      name: student.name,
      role: student.role || "student",
    };

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });

    return {
      success: true,
      statusCode: 200,
      message: "Đăng nhập thành công.",
      data: {
        accessToken,
        user: payload,
      },
    };
  } catch (error) {
    console.error("Verify OTP login error:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Lỗi xác thực OTP. Vui lòng thử lại.",
    };
  }
};

module.exports = {
  sendOtpLoginService,
  verifyOtpLoginService,
};
