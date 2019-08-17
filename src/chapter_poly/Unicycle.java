package chapter_poly;

/**
 * Created by wislie on 2018/10/25.
 */
public class Unicycle extends Bicycle{

    public Unicycle(){
        System.out.println("Unicycle");
    }

    @Override
    public int wheels() {
        return 5;
    }

    @Override
    public String toString() {
        return "unicycle";
    }
}
