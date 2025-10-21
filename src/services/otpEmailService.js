const admin = require("firebase-admin");
const { sendAccessCode } = require("./emailService");

const db = admin.firestore();

// Sinh và lưu OTP vào Firestore
const generateAndSaveOtp = async (email) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 phút sau

  // gửi email
  await sendAccessCode(email, code);

  // lưu vào Firestore
  await db.collection("otpCodes").doc(email).set({
    code,
    createdAt: now,
    expiresAt
  });

  return code;
};

// Xác thực OTP
const verifyOtp = async (email, inputCode) => {
  const doc = await db.collection("otpCodes").doc(email).get();
  if (!doc.exists) return false;

  const data = doc.data();
  const now = new Date();

  if (data.code === inputCode && now <= data.expiresAt.toDate()) {
    // xóa OTP sau khi dùng
    await db.collection("otpCodes").doc(email).delete();
    return true;
  }
  return false;
};

module.exports = { generateAndSaveOtp, verifyOtp };
