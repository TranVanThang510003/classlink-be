const {  getAllStudentService, addStudentService, updateStudentService, removeStudentService,} = require("../services/studentService");

const getAllStudent = async(req,res)=>{
  const data = await getAllStudentService();
  return res.status(data.statusCode).json(data);
}

const addStudent = async(req,res)=>{
  const data = await addStudentService(req.body)
  return res.status(201).json(data)
}

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const data = await updateStudentService(id, req.body);
  return res.status(data.statusCode).json(data);
};

const removeStudent = async (req, res) => {
  const { id } = req.params;
  const data = await removeStudentService(id);
  return res.status(data.statusCode).json(data);
};



module.exports = {
  getAllStudent,
  addStudent,
  updateStudent,
  removeStudent,
};