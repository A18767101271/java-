package chapter_deep_collection.practise_3;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Created by wislie on 2018/11/28.
 */
public class Unsupported {

    private static void test(String msg, List<String> list) {
        System.out.println(msg+"------------");
        Collection<String> c = list;
        Collection<String> subList = list.subList(1, 8);
        Collection<String> c2 = new ArrayList<>(subList);
        try {
            c.retainAll(c2);
        } catch (Exception e) {
            System.out.println("retainAll:" + e);
        }

        try {
            c.removeAll(c2);
        } catch (Exception e) {
            System.out.println("removeAll:" + e);
        }

        try {
            c.clear();
        } catch (Exception e) {
            System.out.println("clear:" + e);
        }

        try {
            c.add("x");
        } catch (Exception e) {
            System.out.println("add:" + e);
        }

        try {
            c.addAll(c2);
        } catch (Exception e) {
            System.out.println("addAll:" + e);
        }

        try {
            c.remove("C");
        } catch (Exception e) {
            System.out.println("remove:" + e);
        }

        try {
            list.set(0, "x");
        } catch (Exception e) {
            System.out.println("set:" + e);
        }
    }

    public static void main(String[] args) {
        List<String> list = Arrays.asList("A B C D E F G H I J K".split(" "));
        test("Arrays.asList()", list);
        test("copy to ArrayList", new ArrayList<>(list));
//        Arrays.asList()------------
//        retainAll:java.lang.UnsupportedOperationException
//        removeAll:java.lang.UnsupportedOperationException
//        clear:java.lang.UnsupportedOperationException
//        add:java.lang.UnsupportedOperationException
//        addAll:java.lang.UnsupportedOperationException
//        remove:java.lang.UnsupportedOperationException
//        copy to ArrayList------------
    }
}
