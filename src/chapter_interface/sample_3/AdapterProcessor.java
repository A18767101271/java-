package chapter_interface.sample_3;

import chapter_interface.Processor;

/**
 * 适配器模式:接受你所拥有的接口，并产生你所需要的接口
 * Created by wislie on 2018/10/29.
 */
public class AdapterProcessor implements Processor {

    private Filter filter;

    public AdapterProcessor(Filter filter) {
        this.filter = filter;
    }

    private static void process(Processor processor, WaveForm obj) {
        String name = processor.getName();
        WaveForm result = (WaveForm) processor.process(obj);
        System.out.println("name:" + name + " result:" + result);
    }

    public static void main(String[] args) {
        process(new AdapterProcessor(new HighFilter()), new WaveForm());
        process(new AdapterProcessor(new LowFilter()), new WaveForm());
    }

    @Override
    public String getName() {
        return filter.getName();
    }

    @Override
    public Object process(Object obj) {
        return filter.process(obj);
    }
}
