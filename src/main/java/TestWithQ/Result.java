package TestWithQ;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@JsonAutoDetect
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
    public String eMail;
    public int id;
    public ZonedDateTime startTime;
    public ZonedDateTime finishTime;
    public int attempt;
    public User user;
    //@JsonIgnore
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    public Map<Question, Answer> resultAnswers;
//    //public ArrayList<Map<Question, Answer>> resultAnswers;
    public ArrayList<ResultAnswer> resultAnswers;


    public Result(String eMail) {
        this.eMail = eMail;
    }

    public Result(@JsonProperty(value = "eMail") String eMail,
                  @JsonProperty(value = "startTime") String startTime,
                  @JsonProperty(value = "finishTime") String finishTime,
                  @JsonProperty(value = "timezoneOffset") int timezoneOffset,
                  @JsonProperty(value = "answers") ArrayList<Map<String, Integer>> questionAnswers) {

        this.eMail = eMail.trim().toLowerCase();
        this.startTime = ZonedDateTime.parse(startTime).plusHours(timezoneOffset);
        this.finishTime = ZonedDateTime.parse(finishTime).plusHours(timezoneOffset);

//        resultAnswers = new HashMap<>();
        resultAnswers = new ArrayList<>();
        for (Map<String, Integer> questionAnswer: questionAnswers) {
//            resultAnswers.put(Question.questionList.get(questionAnswer.get("questionId")), new Answer(questionAnswer.get("answerId"), ""));
            ResultAnswer resultAnswer = new ResultAnswer();
            resultAnswer.question = Question.questionList.get(questionAnswer.get("questionId"));
            resultAnswer.answer = new Answer(questionAnswer.get("answerId"), "");
            resultAnswer.answerIsCorrect = resultAnswer.question.correctAnswerId == resultAnswer.answer.id;
            resultAnswers.add(resultAnswer);
        }

    }


    public void save() {
        try {

            Statement st = DBConnection.connection.createStatement();
            ResultSet rs = st.executeQuery("select max(attempt) as attempt from results where email = \"" + eMail + "\"");
            if (rs.next()) attempt = rs.getInt("attempt") + 1;
            attempt = Math.max(attempt, 1);

            st.execute("insert into results set" +
                    " email = \"" + eMail + "\"," +
                    " startTime = \"" + startTime.truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"," +
                    " finishTime = \"" + finishTime.truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"," +
                    " attempt = \"" + attempt + "\"");

            rs = st.executeQuery("select max(id) as id from results where email = \"" + eMail + "\"");
            if (rs.next()) id = rs.getInt("id");

            PreparedStatement pst = DBConnection.connection.prepareStatement("insert into resultsanswers (resultid, questionid, answerid, answeriscorrect) values (?, ?, ?, ?)");
//            for (Map.Entry<Question, Answer> entry: resultAnswers.entrySet()) {
//                pst.setInt(1, id);
//                pst.setInt(2, entry.getKey().id);
//                pst.setInt(3, entry.getValue().id);
//                pst.setBoolean(4, entry.getKey().correctAnswerId == entry.getValue().id);
//                pst.addBatch();
//            }
            for (ResultAnswer resultAnswer: resultAnswers) {
                pst.setInt(1, id);
                pst.setInt(2, resultAnswer.question.id);
                pst.setInt(3, resultAnswer.answer.id);
                pst.setBoolean(4, resultAnswer.answerIsCorrect);
                pst.addBatch();
            }
            pst.executeBatch();


        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Result loadLastResult(String eMail) {
        Result result = new Result(eMail);
        result.user = new User(eMail);
        result.user.load();
        //result.resultAnswers = new HashMap<>();
        result.resultAnswers = new ArrayList<>();

        try {
            Statement st = DBConnection.connection.createStatement();
            ResultSet rs = st.executeQuery("select \n" +
                    "\tresults.starttime,\n" +
                    "\tresults.finishtime,\n" +
                    "\tresults.attempt,\n" +
                    "\tresults.id,\n" +
                    "\tresultsanswers.questionid,\n" +
                    "\tresultsanswers.answerid,\n" +
                    "\tresultsanswers.answeriscorrect\n" +
                    "from\n" +
                    "\t(select\n" +
                    "\t\tresults.starttime,\n" +
                    "\t\tresults.finishtime,\n" +
                    "\t\tresults.attempt,\n" +
                    "\t\tresults.id\n" +
                    "\tfrom testwithquestions.results as results\n" +
                    "\twhere results.email = \"" + eMail + "\"\n" +
                    "\torder by results.attempt desc\n" +
                    "\tlimit 1) as results\n" +
                    "left join testwithquestions.resultsanswers as resultsanswers\n" +
                    "on resultsanswers.resultid = results.id\n" +
                    "order by resultsanswers.questionid"
            );

            boolean firstIteration = true;
            while (rs.next()) {
                if (firstIteration) {
                    firstIteration = false;
                    result.id = rs.getInt("id");
                    result.startTime = ZonedDateTime.ofInstant(rs.getTimestamp("starttime").toInstant(), ZoneId.of("UTC+2"));
                    result.finishTime = ZonedDateTime.ofInstant(rs.getTimestamp("finishtime").toInstant(), ZoneId.of("UTC+2"));
                    result.attempt = rs.getInt("attempt");
                }
                int currentAnswerId = rs.getInt("answerid");
//                Question currentQuestion = Question.questionList.get(rs.getInt("questionid"));
//                Answer currentAnswer = null;
//                for (Answer eachAnswer: currentQuestion.answers) if (eachAnswer.id == currentAnswerId) currentAnswer = eachAnswer;
//                result.resultAnswers.put(currentQuestion, currentAnswer);
                ResultAnswer resultAnswer = new ResultAnswer();
                resultAnswer.question = Question.questionList.get(rs.getInt("questionid"));
                resultAnswer.answer = null;
                for (Answer eachAnswer: resultAnswer.question.answers) if (eachAnswer.id == currentAnswerId) resultAnswer.answer = eachAnswer;
                resultAnswer.answerIsCorrect = rs.getBoolean("answeriscorrect");
                resultAnswer.correctAnswer = resultAnswer.question.correctAnswer;
                result.resultAnswers.add(resultAnswer);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }
}

class ResultAnswer {
    public Question question;
    public Answer answer;
    public boolean answerIsCorrect;
    public Answer correctAnswer;
}