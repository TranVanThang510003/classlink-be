const admin = require("firebase-admin");
const { sendAccessCode } = require("./emailService");

const db = admin.firestore();

const generateAndSaveOtp = async (email) => {
  const now = new Date();
  const docRef = db.collection("otpCodes").doc(email);
  const existing = await docRef.get();

  // ⚡ Nếu OTP tồn tại và chưa hết hạn → không gửi lại, chỉ báo cho user
  if (existing.exists) {
    const data = existing.data();
    const expiresAt = data.expiresAt.toDate();

    if (now < expiresAt) {
      const remaining = Math.floor((expiresAt - now) / 1000);
      return {
        reused: true,
        code: data.code,
        expiresIn: remaining,
      };
    }
  }

  // ⚡ Nếu chưa có hoặc hết hạn → tạo mới
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 phút

  await sendAccessCode(email, code);

  await docRef.set({
    code,
    createdAt: now,
    expiresAt,
  });

  return {
    reused: false,
    code,
    expiresIn: 300, // 5 phút
  };
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
