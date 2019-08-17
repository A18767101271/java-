package chapter_poly;

/**
 * Created by wislie on 2018/10/25.
 */
public class Tricycle extends BaseCycle{

    private float price = 1000.8f;
    @Override
    public int wheels() {
        return 4;
    }

    @Override
    public void sell() {
        System.out.println("price:"+price);
    }

    @Override
    public String toString() {
        return "tricycle";
    }
}
