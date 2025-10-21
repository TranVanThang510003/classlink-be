const express = require("express");
const router = express.Router();
const {getAllStudent,addStudent,updateStudent,removeStudent} = require("../controllers/studentController");

router.get("/",getAllStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", removeStudent);

module.exports = router;
