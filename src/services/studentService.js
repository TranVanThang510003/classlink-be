const db = require("../config/firebaseDb");
const { sendStudentAddedNotice } = require("./emailService");

const getAllStudentService = async () => {
  try {
    const snapshot = await db.collection("users").where("role", "==", "student").get();
    const students = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return {
      success: true,
      statusCode: 200,
      message: "lấy danh sách students thành công!",
      data: students,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      statusCode: 500,
      message: " lỗi khi lấy danh sách students.",
    };
  }
};

// 🔹 Lấy học sinh theo email (dùng cho OTP login)
const getUserByEmail = async (email) => {
  try {
    if (!email) return null;

    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(), // có role: student | instructor
    };
  } catch (error) {
    console.error("❌ Error in getUserByEmail:", error);
    return null;
  }
};


const addStudentService = async (studentData) => {
  try {
    const dataWithRole = { ...studentData, role: "student" };
    const docRef = await db.collection("users").add(dataWithRole);
    // Gửi email thông báo
    await sendStudentAddedNotice(studentData.email, studentData.name, studentData.className);

    return {
      success: true,
      statusCode: 201,
      message: "Thêm student thành công!",
      data: { id: docRef.id, ...studentData },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      statusCode: 500,
      message: "lỗi khi thêm student.",
    };
  }
};

// Cập nhật student
const updateStudentService = async (id, data) => {
  try {
    await db.collection("users").doc(id).update(data);
    return {
      success: true,
      statusCode: 200,
      message: "cập nhật student thành công!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      statusCode: 500,
      message: "lỗi khi cập nhật student.",
    };
  }
};

const removeStudentService = async (id) => {
  try {
    await db.collection("users").doc(id).delete();
    return {
      success: true,
      statusCode: 200,
      message: "Xoá student thành công!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      statusCode: 500,
      message: "lỗi khi xoá student.",
    };
  }
};

module.exports = {
  getAllStudentService,
  getUserByEmail,
  addStudentService,
  updateStudentService,
  removeStudentService,
};
