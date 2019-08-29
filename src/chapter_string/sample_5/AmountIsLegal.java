package chapter_string.sample_5;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by wislie on 2019/7/3.
 */
public class AmountIsLegal {

    public static void main(String[] args) {
        matches("0.05");
        matches(".05");
        matches("00.05");

    }

    private static void matches(String input){
        String regex = "^[0-9]+$|^[0-9]+\\.[0-9]{1,2}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        boolean isMatches = matcher.matches();
        System.out.println("input:"+input +" "+matcher.matches());
    }
}
