package chapter_string.sample_5;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * find/lookingAt/matches
 * Created by wislie on 2018/11/6.
 */
public class PatternMatcher {

    public static void main(String[] args) {

        String[] arr = {"abcabcabcdefabc", "abc+", "(abc)+", "(abc){2,}"};
        for (String s : arr) {
            find(s, arr[0]);
        }
        //regex:abcabcabcdefabc group:abcabcabcdefabc position:0-15
        //regex:abc+ group:abc position:0-3
        //regex:abc+ group:abc position:3-6
        //regex:abc+ group:abc position:6-9
        //regex:abc+ group:abc position:12-15
        //regex:(abc)+ group:abcabcabc position:0-9
        //regex:(abc)+ group:abc position:12-15
        //regex:(abc){2,} group:abcabcabc position:0-9

        for (String s : arr) {
            lookingAt(s, arr[0]);
        }
        //regex:abcabcabcdefabc group:abcabcabcdefabc position:0-15
        //regex:abc+ group:abc position:0-3
        //regex:(abc)+ group:abcabcabc position:0-9
        //regex:(abc){2,} group:abcabcabc position:0-9


        for (String s : arr) {
            matches(s, arr[0]);
        }
        //true
        //false
        //false
        //false
    }


    private static void find(String regex, String input) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        while (matcher.find()) {
            System.out.println("regex:" + regex + " group:" + matcher.group() + " position:" + matcher.start() + "-" + matcher.end());
        }
    }

    private static void lookingAt(String regex, String input) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        if (matcher.lookingAt()) {
            System.out.println("regex:" + regex + " group:" + matcher.group() + " position:" + matcher.start() + "-" + matcher.end());
        }
    }

    private static void matches(String regex, String input) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        System.out.println(matcher.matches());
    }


}
