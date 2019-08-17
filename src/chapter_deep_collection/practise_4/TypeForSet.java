package chapter_deep_collection.practise_4;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

/**
 * Created by wislie on 2018/11/29.
 */
public class TypeForSet {
    private static <T> Set<T> fill(Set<T> set, Class<T> cls) {
        for (int i = 0; i < 10; i++) {
            try {
                set.add(cls.getConstructor(int.class).newInstance(i));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return set;
    }

    private static <T> Set<T> test(Set<T> set, Class<T> cls) {
        fill(set, cls);
        fill(set, cls);
        fill(set, cls);
        return set;
    }

    public static void main(String[] args) {
        System.out.println("--" + test(new HashSet<>(), SetType.class));
        //[4, 7, 8, 2, 5, 7, 0, 7, 0, 8, 9, 8, 6, 9, 4, 1, 3, 6, 3, 1, 4, 5, 9, 6, 0, 3, 1, 2, 2, 5]
        System.out.println("--" + test(new LinkedHashSet<>(), SetType.class));
        //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//        System.out.println("--" + test(new TreeSet<>(), SetType.class)); //TreeSet需要 元素实现Comparable，否则会抛出java.lang.ClassCastException

        System.out.println("--" + test(new HashSet<>(), HashType.class));
        //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        System.out.println("--" + test(new LinkedHashSet<>(), HashType.class));
        //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        System.out.println("--" + test(new TreeSet<>(), TreeType.class));
        //[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    }
}
