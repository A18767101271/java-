package chapter_string.sample_3;

/**
 * 格式化输出
 * Created by wislie on 2018/11/5.
 */
public class FormatString {

    public static void main(String[] args) {

        String str = "wislie";

        printFormat(String.format("%b", -1));//false
        printFormat(String.format("%c", 98));  //b
        printFormat(String.format("%o", 20)); //24
        printFormat(String.format("%h", 20)); //14
        printFormat(String.format("%d", 20)); //12
        printFormat(String.format("%x", 20)); //f
        printFormat(String.format("%.2f", 20f)); //15.00
        printFormat(String.format("%e", 20.1)); //1.510000e+01
        printFormat(String.format("%.2g", 1024.1)); //1.0e+03
        printFormat(String.format("%s", 123)); //123



    }

    private static void printFormat(String str) {
        System.out.println(str);
    }
}
