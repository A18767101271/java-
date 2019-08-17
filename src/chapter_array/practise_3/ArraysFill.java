package chapter_array.practise_3;

import java.util.Arrays;

/**
 * Created by wislie on 2018/11/25.
 */
public class ArraysFill {
    public static void main(String[] args) {
        int size = 3;
        boolean[] a1 = new boolean[size];
        byte[] a2 = new byte[size];
        char[] a3 = new char[size];
        float[] a4 = new float[size];
        double[] a5 = new double[size];
        long[] a6 = new long[size];
        int[] a7 = new int[size];
        String[] a8 = new String[size];

        Arrays.fill(a1, true);
        Arrays.fill(a2, (byte) 127);
        Arrays.fill(a3, 'a');
        Arrays.fill(a4, 12.5f);
        Arrays.fill(a5, 78.90);
        Arrays.fill(a6, 123);
        Arrays.fill(a7, 10);
        Arrays.fill(a8, "wislie jiayou");

        System.out.println(Arrays.toString(a1));
        System.out.println(Arrays.toString(a2));
        System.out.println(Arrays.toString(a3));
        System.out.println(Arrays.toString(a4));
        System.out.println(Arrays.toString(a5));
        System.out.println(Arrays.toString(a6));
        System.out.println(Arrays.toString(a7));
        System.out.println(Arrays.toString(a8));

        Arrays.fill(a8, 1, 2, "nuli");
        System.out.println(Arrays.toString(a8));
        //[true, true, true]
        //[127, 127, 127]
        //[a, a, a]
        //[12.5, 12.5, 12.5]
        //[78.9, 78.9, 78.9]
        //[123, 123, 123]
        //[10, 10, 10]
        //[wislie jiayou, wislie jiayou, wislie jiayou]
        //[wislie jiayou, nuli, wislie jiayou]
    }
}
