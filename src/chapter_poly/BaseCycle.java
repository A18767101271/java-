package chapter_poly;

/**
 * Created by wislie on 2018/10/25.
 */
public abstract class BaseCycle {

    public int model = 0;
    public BaseCycle(){
        System.out.println("BaseCycle");
        sell();
    }

    public abstract int wheels();

    public abstract void sell();

    public void pull(){
        System.out.println("base pull");
    }

    public int getModel() {
        return model;
    }

    public static void invokeStaticMethod(){
        System.out.println("BaseCycle invokeStaticMethod");
    }

}
