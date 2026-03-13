
const { submitQuizService } = require( "../services/quizService");

const submitQuiz= async(req, res )=> {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const { quizId, answers } = req.body;
    const user = (req).user;

    const result = await submitQuizService({
      quizId,
      answers,
      studentId: user.uid,
    });

    res.json(result);
  } catch (err) {
    console.error("SUBMIT QUIZ ERROR RAW:", err);
    console.error("ERR KEYS:", Object.keys(err));
    console.error("ERR STRING:", JSON.stringify(err, null, 2));
    res.status(err.status || 500).json({
      message: err.message || "Submit quiz failed",
    });
  }
}
module.exports={
  submitQuiz
}