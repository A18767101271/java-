package chapter_array.practise_4;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * sort排序
 * Created by wislie on 2018/12/22.
 */
public class SortArray {

    public static void main(String[] args) {

//        double angle = Math.toDegrees(rad);

//        double rad = Math.toRadians(angle);

//        System.out.println("angle1:"+angle1+" rad1:"+rad1);

        double angle = Math.cos(Math.PI);
        double rad = Math.acos(angle);
        
        double rad2 = Math.acos(1.0/2);
        double angle2 = 180*rad2/Math.PI;
        System.out.println("rad2:"+rad2+" angle2:" + angle2);

        double tan1 = Math.tan(1);
        double tan2 = Math.atan(1);
        double tan3 = Math.atan2(1,1);
        double tan4 =  Math.tanh(1);
        System.out.println("angle:" + angle + " rad:" + rad + " tan1:" + tan1+" tan2:"+tan2+" tan3:"+tan3+" tan4:"+tan4);

        String[] stringArray = getStringArray();
        System.out.println("排序前:" + Arrays.toString(stringArray));
        //[io, collection, generics, array, string, rtti, poly, pattern, interface, internal, exception]
        Arrays.sort(stringArray);
        System.out.println("sort 排序后:" + Arrays.toString(stringArray));
        //[array, collection, exception, generics, interface, internal, io, pattern, poly, rtti, string]
        Arrays.sort(stringArray, String.CASE_INSENSITIVE_ORDER);
        System.out.println("sort CASE_INSENSITIVE_ORDER 排序后:" + Arrays.toString(stringArray));
        //[array, collection, exception, generics, interface, internal, io, pattern, poly, rtti, string]

        double d = Math.atan2(2, 5);
        System.out.println("data:" + d);
    }

    private static List<String> getStringList() {
        List<String> stringList = new ArrayList<>();
        stringList.add("io");
        stringList.add("collection");
        stringList.add("generics");
        stringList.add("array");
        stringList.add("string");
        stringList.add("rtti");
        stringList.add("poly");
        stringList.add("pattern");
        stringList.add("interface");
        stringList.add("internal");
        stringList.add("exception");
        return stringList;
    }

    private static String[] getStringArray() {
        List<String> stringList = getStringList();
        String[] stringArray = new String[stringList.size()];
        stringList.toArray(stringArray);
        return stringArray;
    }
}
