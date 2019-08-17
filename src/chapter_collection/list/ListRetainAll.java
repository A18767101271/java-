package chapter_collection.list;

import java.util.ArrayList;
import java.util.List;

/**
 * 获取连个集合的交集
 */
public class ListRetainAll {

    public static void main(String[] args) {

        List<Integer> listA = new ArrayList<>();
        List<Integer> listB = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            listA.add(i);
            if(i < 3){
                listB.add(i);
            }

        }

        //集合A是否有修改
        System.out.println(listA.retainAll(listB)); //true
        //处理后集合A的元素 为原先集合A和集合B的交集
        System.out.println(listA); //[0, 1, 2]
        //集合B保持不变
        System.out.println(listB);//[0, 1, 2]

    }
}
