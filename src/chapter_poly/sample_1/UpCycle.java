package chapter_poly.sample_1;

import chapter_poly.BaseCycle;
import chapter_poly.Bicycle;
import chapter_poly.Tricycle;
import chapter_poly.Unicycle;

/**
 * 向上转型
 * Created by wislie on 2018/10/25.
 */
public class UpCycle {

    private static void take(BaseCycle cycle) {
        System.out.println("wheels:" + cycle.wheels());
        cycle.pull();
    }

    public static void main(String[] args) {
        Bicycle bicycle = new Bicycle();
        Tricycle tricycle = new Tricycle();
        Unicycle unicycle = new Unicycle();
        take(bicycle);
        take(tricycle);
        take(unicycle);

    }
}
