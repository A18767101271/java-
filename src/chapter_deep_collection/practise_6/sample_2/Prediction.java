package chapter_deep_collection.practise_6.sample_2;

import java.util.Random;

/**
 * Created by wislie on 2018/11/29.
 */
public class Prediction {

    private static Random random = new Random(47);
    private boolean shadow = random.nextDouble() > 0.6;

    @Override
    public String toString() {
        if(shadow){
            return "wislie succeed";
        }
        return "wislie failed";
    }
}
