package chapter_rtti.sample_4;

/**
 * Created by wislie on 2018/11/7.
 */
public class MachineTrigger extends Part {

    static class Factory implements chapter_rtti.sample_4.Factory<MachineTrigger>{

        @Override
        public MachineTrigger create() {
            return new MachineTrigger();
        }
    }
}
