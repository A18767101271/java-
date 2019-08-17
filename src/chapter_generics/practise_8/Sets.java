package chapter_generics.practise_8;

import java.util.HashSet;
import java.util.Set;

/**
 * 实用的Set工具
 * Created by wislie on 2018/11/8.
 */
public class Sets {

    //并集
    public static <T> Set<T> union(Set<T> set1, Set<T>set2){
        Set<T> result = new HashSet<>(set1);
        result.addAll(set2);
        return result;
    }

    //交集
    public static <T> Set<T> intersection(Set<T> set1, Set<T>set2){
        Set<T> result = new HashSet<>(set1);
        result.retainAll(set2);
        return result;
    }

    //差集(相对补集)
    public static <T> Set<T> difference(Set<T> set1, Set<T>set2){
        Set<T> result = new HashSet<>(set1);
        result.removeAll(set2);
        return result;
    }
    //补集
    public static <T> Set<T> complement(Set<T> set1, Set<T>set2){
        return difference(union(set1,set2),intersection(set1,set2));
    }
}
