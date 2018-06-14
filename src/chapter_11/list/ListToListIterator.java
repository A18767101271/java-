package chapter_11.list;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

/**
 * List 转换为 ListIterator
 * Created by wislie on 2018/6/14.
 */
public class ListToListIterator {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for (int i = 1; i < 7; i++) {
            list.add(i);
        }

        ListIterator<Integer> listIterator = list.listIterator();

        while (listIterator.hasNext()){
            System.out.print(" "+listIterator.next());
        }
    }
}
