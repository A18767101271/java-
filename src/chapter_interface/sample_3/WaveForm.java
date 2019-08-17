package chapter_interface.sample_3;

/**
 * Created by wislie on 2018/10/29.
 */
public class WaveForm {

    private static long count = 0;
    private final long id = count++;

    @Override
    public String toString() {
        return "id:" + id;
    }
}
