require("dotenv").config();
const nodemailer = require("nodemailer");

// cấu hình transporter với Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// hàm gửi code OTP
const sendAccessCode = async (toEmail, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your Access Code",
    text: `Your login code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};
//  Hàm gửi thông báo khi được thêm vào lớp học
const sendStudentAddedNotice = async (toEmail, studentName, className) => {
  const loginUrl = "https://your-domain.com/login";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Bạn đã được thêm vào lớp học!",
    html: `
      <p>Xin chào <b>${studentName || "bạn"}</b>,</p>
      <p>Bạn đã được thêm vào lớp học <b>${className || "mới"}</b> trên hệ thống.</p>
      <p>Đăng nhập để bắt đầu tại đây: 
        <a href="${loginUrl}" target="_blank">${loginUrl}</a>
      </p>
      <p>Trân trọng,<br/>Đội ngũ ClassLink</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = { sendAccessCode , sendStudentAddedNotice };
