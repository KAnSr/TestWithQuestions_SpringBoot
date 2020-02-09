package TestWithQ;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.xml.crypto.Data;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@JsonAutoDetect
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    public String firstName;
    public String lastName;
    public String phone;
    public String eMail;
    public ZonedDateTime updateTime;

    public User(){}

    public User(String eMail) {
        this.eMail = eMail.trim().toLowerCase();
    }

    public User(@JsonProperty(value = "firstName") String firstName,
                @JsonProperty(value = "lastName") String lastName,
                @JsonProperty(value = "phone") String phone,
                @JsonProperty(value = "eMail") String eMail,
                @JsonProperty(value = "startTime") String startTime,
                @JsonProperty(value = "timezoneOffset") int timezoneOffset) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.eMail = eMail.trim().toLowerCase();
        this.updateTime = ZonedDateTime.parse(startTime).plusHours(timezoneOffset);
    }

    public void save() throws SQLException {
        //System.out.println("--- save ---");
        try {
            Statement st = DBConnection.connection.createStatement();
            ResultSet rs = st.executeQuery("select id from users where email = \"" + eMail + "\"");
            if (!rs.next()) st.execute("insert into users set email = \"" + eMail + "\"");
            st.execute("update users set" +
                    " firstname = \"" + firstName + "\"," +
                    " lastName = \"" + lastName + "\"," +
                    " phone = \"" + phone + "\"," +
                    " updateTime = \"" + updateTime.truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"" +
                    " where email = \"" + eMail + "\"");
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void load() {
        try {
            Statement st = DBConnection.connection.createStatement();
            ResultSet rs = st.executeQuery("select" +
                    "\tfirstname,\n" +
                    "\tlastName,\n" +
                    "\tphone,\n" +
                    "\tupdateTime\n" +
                    "from users as users\n" +
                    "where email = \"" + eMail + "\"");

            if (rs.next()) {
                firstName = rs.getString("firstName");
                lastName = rs.getString("lastName");
                phone = rs.getString("phone");
                updateTime = ZonedDateTime.ofInstant(rs.getTimestamp("updatetime").toInstant(), ZoneId.of("UTC+2"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
