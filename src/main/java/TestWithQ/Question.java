package TestWithQ;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

public class Question {
    public int id;
    public String question;
    public Answer[] answers;
    @JsonIgnore
    public Answer correctAnswer;
    public int correctAnswerId;

    public static Map<Integer, Question> questionList = new HashMap<>();

    public static void initialize() {
        questionList.clear();

        try {
            Statement st = DBConnection.connection.createStatement();
            ResultSet rs = st.executeQuery(
                    "select\n" +
                    "\tquestions.id as id,\n" +
                    "\tquestions.question as question,\n" +
                    "\tcount(answers.id) as answersquantity\n" +
                    "from\n" +
                    "\tquestions as questions\n" +
                    "\tleft join testwithquestions.answers as answers\n" +
                    "\ton questions.id = answers.questionid\n" +
                    " group by\n" +
                    " \tid,\n" +
                    " \tquestion\n");

            while (rs.next()) {
                Question currentQuestion = new Question();
                currentQuestion.id = rs.getInt("id");
                currentQuestion.question = rs.getString("question");
                currentQuestion.answers = new Answer[rs.getInt("answersquantity")];
                questionList.put(currentQuestion.id, currentQuestion);
            }

            rs = st.executeQuery(
                    "select\n" +
                    "\tquestions.id as id,\n" +
                    "\tanswers.answer as answer,\n" +
                    "\tanswers.id as answerid,\n" +
                    "\tcase when answers.id = questions.correctanswerid then true else false end as iscorrectanswer\n" +
                    "from\n" +
                    "\tquestions as questions\n" +
                    "\tleft join testwithquestions.answers as answers\n" +
                    "\ton questions.id = answers.questionid\n" +
                    "order by\n" +
                    "\tquestions.id, answers.id\n");

            int currentQuestionId = -1, answerIndex = -1;
            Question currentQuestion = null;
            while (rs.next()) {
                if (currentQuestionId != rs.getInt("id")) {
                    currentQuestionId = rs.getInt("id");
                    answerIndex = 0;
                    currentQuestion = questionList.get(currentQuestionId);
                }
                currentQuestion.answers[answerIndex] = new Answer(rs.getInt("answerid"), rs.getString("answer"));
                if (rs.getBoolean("iscorrectanswer")) {
                    currentQuestion.correctAnswer = currentQuestion.answers[answerIndex];
                    currentQuestion.correctAnswerId = currentQuestion.correctAnswer.id;
                }
                answerIndex++;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

//        for (Map.Entry<Integer, Question> entry: questionList.entrySet()) {
//            Question currentQuestion = entry.getValue();
//            System.out.println("" + entry.getKey() + ". " + currentQuestion + ". " + currentQuestion.question + ". [" + currentQuestion.answers.length + "]. " + currentQuestion.correctAnswer.id + ". " + currentQuestion.correctAnswer.answer);
//        }
    }
}
