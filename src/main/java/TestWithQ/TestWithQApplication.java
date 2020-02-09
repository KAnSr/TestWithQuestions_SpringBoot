package TestWithQ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TestWithQApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestWithQApplication.class, args);
		DBConnection.initialize();
		Question.initialize();
	}

}
