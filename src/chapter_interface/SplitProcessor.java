package chapter_interface;

import java.util.Arrays;

/**
 * Created by wislie on 2018/10/29.
 */
public class SplitProcessor implements Processor {
    @Override
    public String getName() {
        return "SplitProcessor";
    }

    @Override
    public String process(Object obj) {
        String[] arr = ((String) obj).split(" ");
        return Arrays.toString(arr);
    }
}
