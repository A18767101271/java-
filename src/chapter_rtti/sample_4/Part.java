package chapter_rtti.sample_4;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by wislie on 2018/11/7.
 */
public class Part {

    private static List<Factory<? extends Part>> factories = new ArrayList<>();

    static {
        factories.add(new Filter.Factory());
        factories.add(new CloudFilter.Factory());
        factories.add(new WaterFilter.Factory());
        factories.add(new Trigger.Factory());
        factories.add(new MachineTrigger.Factory());
    }

    static Part createRandom() {
        Random rd = new Random();
        Factory<? extends Part> partFactory = factories.get(rd.nextInt(factories.size()));
        Part part = partFactory.create();
        return part;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName();
    }


    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            Part part = createRandom();
            System.out.print(part + " ");
        }
    }
}
