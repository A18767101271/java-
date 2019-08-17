package chapter_interface;

/**
 * Created by wislie on 2018/10/29.
 */
public class UpCaseProcessor implements Processor {
    @Override
    public String getName() {
        return "UpCaseProcessor";
    }

    @Override
    public String process(Object obj) {
        return ((String)obj).toUpperCase();
    }
}
