package chapter_array.practise_1;

import java.util.Arrays;

/**
 * Created by wislie on 2018/7/28.
 */
public class MultiBaseArray {

    public static void main(String[] args) {
        int[] arr = new int[9];
        System.out.println(Arrays.toString(arr));
        Integer[] integerArr = new Integer[9]; //包装型的数组 默认为null
        System.out.println(Arrays.toString(integerArr));
    }
}
