
const getUser = async (req, res) => {
  const data = req.user;
  return res.status(data.statusCode).json(data);
};

module.exports ={
  getUser,
};