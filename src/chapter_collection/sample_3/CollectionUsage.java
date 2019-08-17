package chapter_collection.sample_3;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

/**
 * 将元素添加到Collection的三种方式
 * Created by wislie on 2018/10/30.
 */
public class CollectionUsage {

    public static void main(String[] args) {
        Collection<Integer> collections = new ArrayList<>();

        collections.addAll(Arrays.asList(1, 3, 5, 7, 9));
        System.out.println(collections);//[1, 3, 5, 7, 9]

        Collections.addAll(collections, 2, 4, 6);
        System.out.println(collections);//[1, 3, 5, 7, 9, 2, 4, 6]

        Integer[] moreInts = {8, 10};
        Collections.addAll(collections, moreInts);
        System.out.println(collections); //[1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
    }
}
