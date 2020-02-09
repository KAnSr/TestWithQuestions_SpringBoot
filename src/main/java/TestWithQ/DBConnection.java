package TestWithQ;

import java.sql.*;

public class DBConnection {
    public static Connection connection;

    public static void initialize() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // initialize driver
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/testwithquestions", "root", "Sasasa00");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("connection=" + connection);

    }
}
