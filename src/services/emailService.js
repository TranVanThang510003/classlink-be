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

module.exports = { sendAccessCode };
