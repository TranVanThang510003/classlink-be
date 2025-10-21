const db = require("../config/firebase");

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

const addStudentService = async (studentData) => {
  try {
    const dataWithRole = { ...studentData, role: "student" };
    const docRef = await db.collection("users").add(dataWithRole);
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
  addStudentService,
  updateStudentService,
  removeStudentService,
};
