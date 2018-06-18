package chapter_collection.collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 对列表进行反转
 * Created by wislie on 2018/6/16.
 */
public class ReverseList {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            list.add("data-" + i);
        }
        Collections.reverse(list);
        System.out.print("反转后的list :" + list);
    }

}
