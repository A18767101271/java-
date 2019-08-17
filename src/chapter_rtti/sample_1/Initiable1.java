package chapter_rtti.sample_1;

import java.util.Random;

/**
 * Created by wislie on 2018/11/6.
 */
public class Initiable1 {

    public static final int CONSTANT_1 = 18;
    public static final int CONSTANT_2 = new Random().nextInt(99);
    static {
        System.out.println("wislie is zhuyuli");
    }

    public Initiable1(){
        System.out.println("Initiable1 constructor");
    }
}
