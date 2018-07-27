package mvc.service;

import org.springframework.stereotype.Component;
import java.util.Random;

@Component
public class RandomService {

    public String randomGenerator(int input) {
        Random rand = new Random();

        int val = rand.nextInt(input);

        return Integer.toString(val);
    }
}
