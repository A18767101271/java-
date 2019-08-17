package chapter_poly;

/**
 * Created by wislie on 2018/10/25.
 */
public class Bicycle extends BaseCycle{

    public int model = 5;
    public Bicycle(){
        System.out.println("Bicycle");
    }

    @Override
    public int wheels() {
        return 2;
    }

    @Override
    public void sell() {

    }

    @Override
    public void pull() {
        System.out.println("bicycle pull");
    }

    @Override
    public int getModel() {
        return model;
    }

    public static void invokeStaticMethod(){
        System.out.println("Bicycle invokeStaticMethod");
    }
}
