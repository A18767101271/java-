package chapter_collection.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 将元素填充到list
 * Created by wislie on 2018/6/16.
 */
public class FillList {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            list.add("data-" + i);
        }
        Collections.fill(list, "mylist");
        System.out.print("填充后的list :" + list);
    }
}
