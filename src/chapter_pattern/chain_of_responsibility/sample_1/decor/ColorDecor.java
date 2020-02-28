package chapter_pattern.chain_of_responsibility.sample_1.decor;

import chapter_pattern.chain_of_responsibility.sample_1.TaskAttribute;
import chapter_pattern.chain_of_responsibility.sample_1.Desk;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:19 下午
 * desc   : 颜色
 * version: 1.0
 */
public class ColorDecor implements Decor {

    @Override
    public Desk proceed(Chain chain, Desk preDesk) {
        TaskAttribute task = chain.carry();
        String color = task.getColor();
        Desk alphaDesk = chain.proceed(task, preDesk);
        if (alphaDesk != null) {
            alphaDesk.setColor(color);
            return alphaDesk;
        }
        Desk colorDesk = new Desk();
        colorDesk.setColor(color);
        return colorDesk;
    }
}
