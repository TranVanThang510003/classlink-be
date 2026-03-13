const db= require("../config/firebaseDb");

const submitQuizService=async({
  quizId,
  answers,
  studentId,
}) =>{
  // 1️⃣ quiz
  const quizSnap = await db.doc(`quizzes/${quizId}`).get();
  if (!quizSnap.exists) {
    throw { status: 404, message: "Quiz not found" };
  }

  const quiz = quizSnap.data();
  if (quiz.status !== "published") {
    throw { status: 403, message: "Quiz not published" };
  }

  // 2️⃣ questions
  const qsSnap = await db
    .collection("quizQuestions")
    .where("quizId", "==", quizId)
    .orderBy("order")
    .get();

  const questions = qsSnap.docs.map(d => d.data());

  // 3️⃣ score
  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) score++;
  });

  // 4️⃣ save
  await db.collection("quizSubmissions").add({
    quizId,
    classId: quiz.classId,
    studentId,
    answers,
    score,
    submittedAt: new Date(),
  });

  return {
    score,
    total: questions.length,
  };
}
module.exports = {
  submitQuizService,
};
