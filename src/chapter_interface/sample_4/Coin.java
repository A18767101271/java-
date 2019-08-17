package chapter_interface.sample_4;

import java.util.Random;

/**
 * Created by wislie on 2018/10/29.
 */
public class Coin implements Thrower {

    private Random rd = new Random();

    @Override
    public String throwing() {
        boolean bool = rd.nextBoolean();
        return bool ? "正":"反";
    }
}
