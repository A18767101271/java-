package chapter_rtti.sample_4;

/**
 * Created by wislie on 2018/11/7.
 */
public class Filter extends Part {

    public static class Factory implements chapter_rtti.sample_4.Factory<Filter>{

        @Override
        public Filter create() {
            return new Filter();
        }
    }
}
