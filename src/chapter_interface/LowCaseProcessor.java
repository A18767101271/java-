package chapter_interface;

/**
 * Created by wislie on 2018/10/29.
 */
public class LowCaseProcessor implements Processor {
    @Override
    public String getName() {
        return "LowCaseProcessor";
    }

    @Override
    public String process(Object obj) {
        return ((String)obj).toLowerCase();
    }
}
