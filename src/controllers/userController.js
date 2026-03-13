// const admin = require("../config/firebaseAdmin");
//
// exports.setUserRole = async (req, res) => {
//   try {
//     const { uid, role } = req.body;
//
//     if (!["student", "instructor"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }
//
//     await admin.auth().setCustomUserClaims(uid, {
//       role,
//     });
//
//     return res.json({
//       message: "Role updated",
//       uid,
//       role,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to set role" });
//   }
// };
