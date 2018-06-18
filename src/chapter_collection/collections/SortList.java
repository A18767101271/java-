package chapter_collection.collections;

import java.util.*;

/**
 * 对list进行排序
 * Created by wislie on 2018/6/15.
 */
public class SortList {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();
        Random random = new Random();
        for (int i = 1; i < 7; i++) {
            list.add(" " + random.nextInt(40));
        }

        System.out.print("排序前:"+list);
        //对list进行排序,默认是升序
        Collections.sort(list, new Comparator<String>(){

            @Override
            public int compare(String o1, String o2) {
                if (o1.compareTo(o2) == 0) {
                    return 0;
                } else if (o1.compareTo(o2) > 0) {
                    return 1;
                }
                return -1;
            }
        });
        System.out.print("\n排序后:" + list);


    }
}
