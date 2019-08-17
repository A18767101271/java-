package chapter_generics.practise_18;

/**
 * Created by wislie on 2018/11/20.
 */
public class Mime {

    private String name;

    public Mime(String name) {
        this.name = name;
    }

    public void sit() {
        System.out.println(name + " sit");
    }

    public void walk() {
        System.out.println(name + " walk");
    }

    public void swim(String str) {
        System.out.println(name + " swim~" + str);
    }

    public void run(String arg1, String arg2) {
        System.out.println(name + " run~" + arg1 + " " + arg2);
    }
}
