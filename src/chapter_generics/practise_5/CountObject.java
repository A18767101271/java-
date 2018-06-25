package chapter_generics.practise_5;

/**
 * Created by wislie on 2018/6/21.
 */
public class CountObject {

    private static int count = 0;
    private final int id = count++; //有没有 static差别那么大

    @Override
    public String toString() {
        return "CountObject:" + id;
    }
}
