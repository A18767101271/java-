package chapter_string.sample_4;

import java.util.Arrays;

/**
 * Created by wislie on 2018/11/5.
 */
public class RegexUtils {

    public static void main(String[] args) {
        matches("-?", "-"); //true
        matches("\\\\", "\\"); //true
        matches("\\d+", "189"); //true

        split(",", "wislie,is,zhuyuli");//[wislie, is, zhuyuli]
        split("\\W+", "wislie  is zhuyuli");//[wislie, is, zhuyuli] 非单词字符
        split("o\\w", "internal mediocrity is the moment when you lost the faith of being excellent");
        //[internal medi, rity is the m, ent when y,  l, t the faith ,  being excellent]
        split("o\\w+", "internal mediocrity is the moment when you lost the faith of being excellent");
        //[internal medi,  is the m,  when y,  l,  the faith ,  being excellent]

        replace("internal mediocrity is the moment when you lost the faith of being excellent","n","k");
        //ikterkal mediocrity is the momekt whek you lost the faith of beikg excellekt
        replaceAll("internal mediocrity is the moment when you lost the faith of being excellent","i\\w+","zhu");
        //zhu medzhu zhu the moment when you lost the fazhu of bezhu excellent
    }


    private static void matches(String regex, String input) {
        boolean isMatches = input.matches(regex);
        System.out.println(isMatches);
    }

    //将字符串从正则表达式匹配的地方切开
    private static void split(String regex, String input) {
        String[] arr = input.split(regex);
        System.out.println(Arrays.toString(arr));
    }

    private static void replace(String input, CharSequence target, CharSequence replacement) {
        String result = input.replace(target, replacement);
        System.out.println(result);
    }

    private static void replaceAll(String input, String regex, String replacement) {
        String result = input.replaceAll(regex, replacement);
        System.out.println(result);
    }
}
