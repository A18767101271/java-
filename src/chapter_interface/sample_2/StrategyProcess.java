package chapter_interface.sample_2;

import chapter_interface.LowCaseProcessor;
import chapter_interface.Processor;
import chapter_interface.SplitProcessor;
import chapter_interface.UpCaseProcessor;

/**
 * 策略模式: 创建一个能够根据所传递的参数对象的不同而具有不同行为的方法</font>
 * Created by wislie on 2018/10/29.
 */
public class StrategyProcess {

    private static void process(Processor processor, String string){
        String name = processor.getName();
        String result = (String) processor.process(string);
        System.out.println("name:"+name+" result:"+result);
    }

    public static void main(String[] args) {
        String str = "wislie is zhuyuli";
        process(new UpCaseProcessor(),str);
        process(new LowCaseProcessor(),str);
        process(new SplitProcessor(),str);
    }
}
