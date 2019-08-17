package chapter_string.sample_5;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by wislie on 2018/11/6.
 */
public class RegexPractise {

    public static void main(String[] args) {
//        test1();
//        test2();
        test3();
    }

    private static void matches(String regex, String input) {
        Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(input);
        System.out.println("regex:" + regex + " " + matcher.matches());
    }

    private static void test1() {
        String input = "Java now has regular expressions";
        String[] regexes = {"^Java", "\\Breg.*", "n.w\\s+h(a|i)s", "s?", "s*", "s+", "s{4}", "s{1}", "s{0,3}"};
        for (String regex : regexes) {
            matches(regex, input);
        }
    }

    private static void test2() {
        String input = "Arline ate eight apples and one orange while Anita hadn't any";
        String regex = "(?i)((^[aeiou])|(\\s+[aeiou]))\\w+?[aeiou]\\b";
        matches(regex, input);
    }

    private static void test3() {
        Pattern pattern = Pattern.compile("[bfd][aio][gn][se]");
        Matcher matcher = pattern.matcher("bags are fine");
        while (matcher.find()) {
            System.out.print(matcher.group() + " ");
        }//bags fine
        System.out.println();
        matcher.reset("dogs are fine");
        while (matcher.find()) {
            System.out.print(matcher.group() + " ");
        }//dogs fine
    }
}
