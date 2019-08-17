package chapter_collection.sample_7;

import java.util.Set;
import java.util.TreeSet;

/**
 *
 * Created by wislie on 2018/10/30.
 */
public class UniqueWordsAlphabetic {

    public static void main(String[] args) {
        Set<String> words = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        words.add("wislie");
        words.add("is");
        words.add("zhuyuli");
        System.out.print(words);
    }
}
