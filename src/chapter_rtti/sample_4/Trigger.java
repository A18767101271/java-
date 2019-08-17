package chapter_rtti.sample_4;

/**
 * Created by wislie on 2018/11/7.
 */
public class Trigger extends Part {

    static class Factory implements chapter_rtti.sample_4.Factory<Trigger>{

        @Override
        public Trigger create() {
            return new Trigger();
        }
    }
}
