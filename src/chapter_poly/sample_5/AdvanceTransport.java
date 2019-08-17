package chapter_poly.sample_5;

import chapter_poly.Unicycle;

/**
 * Created by wislie on 2018/10/26.
 */
public class AdvanceTransport extends BaseTransport {

    @Override
    public Unicycle getCycle() {
        return new Unicycle();
    }
}
