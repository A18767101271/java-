package chapter_generics.practise_21;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by wislie on 2019/4/18.
 */
public class GenericCheck {

    public static void main(String[] args) {

        List<String> strings = new ArrayList<>();
//        unSafeAdd(strings, new Integer(5));
//        String s = strings.get(0);

        Set<String> set1 = new HashSet<>();
        Set<String> set2 = new HashSet<>();
        Set<Integer> set3 = new HashSet<>();
        set1.add("fridge");
        set1.add("sofa");
        set1.add("light");
        set2.add("sofa");
        set2.add("light");
        safeAdd(set1, set2);

        set3.add(1);
        safeAdd(set1, set3);

        unSafeAdd(set1,set2);
        unSafeAdd(set1,set3);

        List<Integer> inters = new ArrayList<>();
        inters.add(108);
        Number d = limitGeneric(inters);
        System.out.println("获取限制性类型参数:" + d);

        List<Float> floats = new ArrayList<>();
        floats.add(10f);
        Number d2 = limitGeneric(floats);
        System.out.println("获取限制性类型参数:" + d2);

//       List<Object> objects = new ArrayList<>();
//       limitGeneric(objects);


//        genericsList.add("wislie");
    }

    private static void unSafeAdd(List list, Object obj) {
        list.add(obj);
    }

    private static void unSafeAdd(Set set1, Set set2) {
        int result = 0;
        for (Object o1 : set1) {
            if (set2.contains(o1)) {
                result++;
            }
        }
        System.out.println("count:" + result);
    }

    private static void safeAdd(Set<?> set1, Set<?> set2) {
        int result = 0;
        for (Object o1 : set1) {
            if (set2.contains(o1)) {
                result++;
            }
        }
        System.out.println("count:" + result);
    }

    private static Number limitGeneric(List<? extends Number> dataList) {
        Number number = dataList.get(0);
        return number;
    }

   /* private static <E extends Number> E limitGeneric2(List<? extends E> dataList) {
        E number = dataList.get(0);
        return number;
    }*/
}
