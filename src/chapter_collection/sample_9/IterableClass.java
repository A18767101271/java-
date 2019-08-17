package chapter_collection.sample_9;

import org.jetbrains.annotations.NotNull;

import java.util.Iterator;

/**
 * Iterable遍历
 * Created by wislie on 2018/10/30.
 */
public class IterableClass implements Iterable<String>{

    private final String[] squence = {"internal", "mediocrity", "is", "the",
            "moment","lost","the","faith", "of","being","excellent"};
    @NotNull
    @Override
    public Iterator<String> iterator() {
        return new Iterator<String>() {
            int index;
            @Override
            public boolean hasNext() {
                return index < squence.length;
            }

            @Override
            public String next() {
                return squence[index++];
            }
        };
    }

    public static void main(String[] args) {
        IterableClass itr = new IterableClass();
        for(String str : itr){
            System.out.print(str+" ");
        }
    }
}
