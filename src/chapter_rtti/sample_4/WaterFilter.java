package chapter_rtti.sample_4;

/**
 * Created by wislie on 2018/11/7.
 */
public class WaterFilter extends Filter {

    static class Factory implements chapter_rtti.sample_4.Factory<WaterFilter>{

        @Override
        public WaterFilter create() {
            return new WaterFilter();
        }
    }
}
