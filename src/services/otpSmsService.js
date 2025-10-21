const admin = require("firebase-admin");
const twilio = require("twilio");

const db = admin.firestore();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Sinh OTP và gửi SMS
const generateAndSendOtp = async (phoneNumber) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 phút

  // gửi SMS
  await client.messages.create({
    body: `Your verification code is: ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });

  // lưu Firestore
  await db.collection("otpCodes").doc(phoneNumber).set({
    code,
    createdAt: now,
    expiresAt
  });

  return code;
};

// Xác thực OTP
const verifyOtp = async (phoneNumber, inputCode) => {
  const doc = await db.collection("otpCodes").doc(phoneNumber).get();
  if (!doc.exists) return false;

  const data = doc.data();
  const now = new Date();

  if (data.code === inputCode && now <= data.expiresAt.toDate()) {
    await db.collection("otpCodes").doc(phoneNumber).delete();
    return true;
  }
  return false;
};

module.exports = { generateAndSendOtp, verifyOtp };
