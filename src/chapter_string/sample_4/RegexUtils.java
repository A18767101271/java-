package chapter_string.sample_4;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by wislie on 2018/11/5.
 */
public class RegexUtils {

    public static void main(String[] args) {
//        matches("-?", "-"); //true
//        matches("\\\\", "\\"); //true
//        matches("\\d+", "189"); //true

//        split(",", "wislie,is,zhuyuli");//[wislie, is, zhuyuli]
//        split("\\W+", "wislie  is zhuyuli");//[wislie, is, zhuyuli] 非单词字符
//        split("o\\w", "internal mediocrity is the moment when you lost the faith of being excellent");
        //[internal medi, rity is the m, ent when y,  l, t the faith ,  being excellent]
//        split("o\\w+", "internal mediocrity is the moment when you lost the faith of being excellent");
        //[internal medi,  is the m,  when y,  l,  the faith ,  being excellent]

//        replace("internal mediocrity is the moment when you lost the faith of being excellent","n","k");
        //ikterkal mediocrity is the momekt whek you lost the faith of beikg excellekt
//        replaceAll("internal mediocrity is the moment when you lost the faith of being excellent","i\\w+","zhu");
        //zhu medzhu zhu the moment when you lost the fazhu of bezhu excellent

        //手机电话号码的正则表达式
        String phoneNumRegex = "^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$";
        String phoneNum = "18967101271";
        boolean isPhoneMatches = isMatches(phoneNumRegex, phoneNum); //true


        String idCardRegex = "^\\d{17}([0-9]|X)$";
        String idCard = "330721198011230518";
        boolean isIdCardMatches = isMatches(idCardRegex, idCard); //true
        System.out.println(isIdCardMatches);

        //24小时格式
        String time24HourRegex = "[0-1][0-9]|2[0-3]:[0-5][0-9]:[0-5][0-9]";
        String time24Hour = "23:24:59";
        boolean isTime24HourMatches = isMatches(time24HourRegex, time24Hour); //true
        System.out.println(isTime24HourMatches);
    }

    private static boolean isMatches(String regex, String input) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        return matcher.matches();
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
