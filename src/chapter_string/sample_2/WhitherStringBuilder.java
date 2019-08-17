package chapter_string.sample_2;

/**
 * 比较StringBuilder 和 "-"
 * Created by wislie on 2018/11/5.
 */
public class WhitherStringBuilder {

    public String implicit(String[] fields) {
        String result = "";
        for (int i = 0; i < fields.length; i++) {
            result += fields[i];
        }
        return result;
    }

    public String explicit(String[] fields) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < fields.length; i++) {
            result.append(fields[i]);
        }
        return result.toString();
    }
}
