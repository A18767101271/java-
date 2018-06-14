package chapter_11;

import java.util.ArrayList;
import java.util.List;

/**
 * 集合转数组
 */
public class ListToArrays {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            list.add(i);
        }
        //集合转换成数组 并遍历
        System.out.println("集合转换成数组： ");
        for (Object data : list.toArray()) {
            System.out.print(data + " ");
        }


        System.out.println("\n数组元素数量少于集合中的元素数量：");
        //当数组元素数量少于集合中的元素数量
        Integer[] src_1 = new Integer[]{6, 7, 8, 9};
        Integer[] desc_1 = list.toArray(src_1);
        System.out.print("源数组:\n");
        for (Object data : src_1) {
            System.out.print(data + " ");
        }
        System.out.println("\n目标数组:");
        for (Object data : desc_1) {
            System.out.print(data + " ");
        }

        System.out.println("\n数组元素数量等于集合中的元素数量： ");
        Integer[] src_2 = new Integer[]{6, 7, 8, 9, 10};
        Integer[] desc_2 = list.toArray(src_2);
        System.out.print("源数组:\n");
        for (Object data : src_2) {
            System.out.print(data + " ");
        }
        System.out.println("\n目标数组:");
        for (Object data : desc_2) {
            System.out.print(data + " ");
        }

        System.out.println("\n数组元素数量大于集合中的元素数量： ");
        Integer[] src_3 = new Integer[]{6, 7, 8, 9, 10, 11, 12};
        Integer[] desc_3 = list.toArray(src_3);
        System.out.print("源数组:\n");
        for (Object data : src_3) {
            System.out.print(data + " ");
        }
        System.out.println("\n目标数组:");
        for (Object data : desc_3) {
            System.out.print(data + " ");
        }
    }
}
