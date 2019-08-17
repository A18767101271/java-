package chapter_generics.practise_5;

/**
 *
 * Created by wislie on 2018/6/21.
 */
public class CountObject {

    private static int count = 0;
    private final int id = count++;

    @Override
    public String toString() {
        return "CountObject:" + id;
    }
}
