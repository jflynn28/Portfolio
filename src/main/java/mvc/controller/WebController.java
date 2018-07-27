package mvc.controller;

import mvc.model.Request;
import mvc.service.RandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class WebController {

    @Autowired
    private RandomService randomService;

    @PostMapping(value = "/request")
    public ResponseEntity<Void> request(@RequestBody Request request) {

        System.out.println(request.getField1());
        System.out.println(request.getField2());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/random")
    public ResponseEntity<String> randomGenerator(@RequestBody int request) {

        String result = randomService.randomGenerator(request);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/health")
    public ResponseEntity<Void> health() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping("/")
    public String index(Map<String, Object> model) {
        return "index";
    }
}