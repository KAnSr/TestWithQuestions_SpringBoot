package TestWithQ;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringReader;
import java.sql.SQLException;
import java.util.ArrayList;


@Controller
public class MyController {

//    @GetMapping("/greeting")
//    public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
//        model.addAttribute("name", name);
//        System.out.println("MyController(name= " + name + ", model= " + model + ")");
//        return "greeting";
//    }

    @PostMapping(value = "/api/userAuthentificationData")
    @ResponseBody
    public void updateUser(@RequestBody String str) throws IOException, SQLException {
        //System.out.println(str);
        //try {
            ObjectMapper mapper = new ObjectMapper();

            StringReader stringReader = new StringReader(str);

            User user = mapper.readValue(stringReader, User.class);
            user.save();

//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    @GetMapping(value = "/api/getQuestionList")
    @ResponseBody
    public String getQuestionList() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            //return mapper.writeValueAsString(Question.questionList.values().toArray());
            return mapper.writeValueAsString(Question.questionList.values());


        } catch (Exception e) {
            e.printStackTrace();
        }


        return "getQuestionList error!";
    }

    @PostMapping(value = "/api/finishTest")
    @ResponseBody
    public void finishTest(@RequestBody String str) {
        System.out.println(str);
        try {

            ObjectMapper mapper = new ObjectMapper();
            StringReader stringReader = new StringReader(str);
            Result result = mapper.readValue(stringReader, Result.class);
            result.save();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping(value = "/api/getResult")
    @ResponseBody
    public String getResult(@RequestParam(name = "email", required = true) String eMail) {
        try {
            Result result = Result.loadLastResult(eMail);
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            return mapper.writeValueAsString(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "getResult() error!";
    }

    @GetMapping(value = "/api/getResultStatistic")
    @ResponseBody
    public String getResultStatistic() {
        try {
            ArrayList<ResultStatistic> arrayResultStatistic = ResultStatistic.loadResultStatistic();
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            return mapper.writeValueAsString(arrayResultStatistic);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "getResultStatistic() error!";
    }
}
