package TestWithQ;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;

@JsonAutoDetect
public class ResultStatistic {
    public String eMail;
    public String firstName;
    public String lastName;
    public int attempt;
    public int totalCorrectAnswers;
    public double averageCorrectAnswers;
    public int questions;
    public ZonedDateTime lastFinishTime;
    public int lastResultId;
    public int lastCorrectAnswers;



    public static ArrayList<ResultStatistic> loadResultStatistic() {
        ArrayList<ResultStatistic> arrayResultStatistic = new ArrayList<>();

        try {
            Statement st = DBConnection.connection.createStatement();

            DBConnection.connection.setAutoCommit(false);
            st.execute("" +
                    "CREATE TEMPORARY table resultsstatistic ENGINE=MEMORY\n" +
                    "(select\n" +
                    "\tresults.email as email,\n" +
                    "\tmax(results.attempt) as attempt,\n" +
                    "\tsum(resultsanswers.answeriscorrect) as totalcorrectanswers,\n" +
                    "\tcount(distinct resultsanswers.questionid) as questions,\n" +
                    "\tcase\n" +
                    "\t\twhen max(results.attempt) = 0 then 0\n" +
                    "\t\telse sum(resultsanswers.answeriscorrect) / max(results.attempt)\n" +
                    "\tend as averagecorrectanswers\n" +
                    "from results as results\n" +
                    "left join resultsanswers as resultsanswers\n" +
                    "on resultsanswers.resultid = results.id\n" +
                    "group by email)\n");

            ResultSet rs = st.executeQuery("" +
                    "select\n" +
                    "\tresultsstatistic.email as email,\n" +
                    "\tusers.firstname,\n" +
                    "\tusers.lastname,\t\n" +
                    "\tresultsstatistic.attempt as attempt,\n" +
                    "\tresultsstatistic.totalcorrectanswers as totalcorrectanswers,\n" +
                    "\tresultsstatistic.averagecorrectanswers as averagecorrectanswers,\n" +
                    "\tresultsstatistic.questions as questions,\n" +
                    "\tresults.finishtime as lastfinishtime,\n" +
                    "\tresults.id as lastresultid,\n" +
                    "\tsum(resultsanswers.answeriscorrect) as lastcorrectanswers \n" +
                    "from resultsstatistic as resultsstatistic\n" +
                    "left join results as results\n" +
                    "on results.email = resultsstatistic.email\n" +
                    "\tand results.attempt = resultsstatistic.attempt   \n" +
                    "left join resultsanswers as resultsanswers\n" +
                    "on resultsanswers.resultid = results.id\n" +
                    "left join users as users\n" +
                    "on users.email = resultsstatistic.email \n" +
                    "group by email, firstname, lastname, attempt, totalcorrectanswers, averagecorrectanswers, questions, lastfinishtime, lastresultid\n" +
                    "order by averagecorrectanswers desc\n");

            while (rs.next()) {
                ResultStatistic resultStatistic = new ResultStatistic();
                resultStatistic.eMail = rs.getString("email");
                resultStatistic.firstName = rs.getString("firstname");
                resultStatistic.lastName = rs.getString("lastname");
                resultStatistic.attempt = rs.getInt("attempt");
                resultStatistic.totalCorrectAnswers = rs.getInt("totalcorrectanswers");
                resultStatistic.averageCorrectAnswers = rs.getDouble("averagecorrectanswers");
                resultStatistic.questions = rs.getInt("questions");
                resultStatistic.lastFinishTime = ZonedDateTime.ofInstant(rs.getTimestamp("lastfinishtime").toInstant(), ZoneId.of("UTC+2"));
                resultStatistic.lastResultId = rs.getInt("lastresultid");
                resultStatistic.lastCorrectAnswers = rs.getInt("lastcorrectanswers");
                arrayResultStatistic.add(resultStatistic);
            }

            st.execute("drop TEMPORARY table resultsstatistic");
            DBConnection.connection.commit();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return arrayResultStatistic;
    }

}
