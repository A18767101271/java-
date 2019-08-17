package chapter_string.sample_3;

/**
 * 格式化输出
 * Created by wislie on 2018/11/5.
 */
public class FormatString {

    public static void main(String[] args) {

        String str = "wislie";

        printFormat(String.format("%d", 1024));//1024
        printFormat(String.format("%c", str.charAt(0)));//w
        printFormat(String.format("%b", str));//true
        printFormat(String.format("%s", str));//wislie
        printFormat(String.format("%.3f", 1024.1024));//1024.102
        printFormat(String.format("%e", 128.1));//1.281000e+02
        printFormat(String.format("%x", 256));//100
        printFormat(String.format("%h", 127));//7f
    }

    private static void printFormat(String str) {
        System.out.println(str);
    }
}
