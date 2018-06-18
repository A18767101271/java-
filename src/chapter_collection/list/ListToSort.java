package chapter_collection.list;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 对集合进行排序
 * Created by wislie on 2018/6/14.
 */
public class ListToSort {

    public static void main(String[] args) {

        Random random = new Random();
        List<Integer> list = new ArrayList<>();

        for (int i = 1; i < 7; i++) {
            list.add(random.nextInt(50));
        }

        System.out.print("排序前:" + list);

        list.sort((o1, o2) -> {
            if (o1.intValue() == o2.intValue()) {
                return 0;
            } else if (o1.intValue() > o2.intValue()) {
                return 1;
            }
            return -1;
        });

//        list.sort(new Comparator<Integer>() {
//            @Override
//            public int compare(Integer o1, Integer o2) {
//                if (o1.intValue() == o2.intValue()) {
//                    return 0;
//                } else if (o1.intValue() > o2.intValue()) {
//                    return 1;
//                }
//                return -1;
//            }
//        });
        System.out.print("\n排序后:" + list);
    }
}
