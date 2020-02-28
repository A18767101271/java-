package chapter_pattern.chain_of_responsibility.sample_1.decor;

import chapter_pattern.chain_of_responsibility.sample_1.TaskAttribute;
import chapter_pattern.chain_of_responsibility.sample_1.Desk;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:19 下午
 * desc   : 尺寸
 * version: 1.0
 */
public class DimenDecor implements Decor {

    @Override
    public Desk proceed(Chain chain, Desk preDesk) {
        TaskAttribute task = chain.carry();
        Desk colorDesk = chain.proceed(task, preDesk);
        if (colorDesk != null) {
            colorDesk.setSize(task.size());
            return colorDesk;
        }
        Desk dimenDesk = new Desk();
        dimenDesk.setSize(task.size());
        return dimenDesk;
    }
}
