package chapter_collection.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * 二分法查找值
 * Created by wislie on 2018/6/15.
 */
public class BinarySearch {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            list.add("data-" + i);
        }

        int pos = Collections.binarySearch(list, "data-3");
        System.out.print("\npos:" + pos+"\n");

        int binaryIndex = Collections.binarySearch(list, "data-5", new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                System.out.println("o1:" + o1 + " o2：" + o2+" ");
                if (o1.compareTo(o2) == 0) return 0;
                if (o1.compareTo(o2) > 0) return 1;
                return -1;
            }
        });
        System.out.print("binaryIndex:" + binaryIndex);
    }
}
