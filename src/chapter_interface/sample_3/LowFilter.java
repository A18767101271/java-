package chapter_interface.sample_3;

/**
 * Created by wislie on 2018/10/29.
 */
public class LowFilter extends Filter {
    @Override
    String getName() {
        return "LowFilter";
    }

    @Override
    WaveForm process(Object obj) {
        return (WaveForm) obj;
    }
}
