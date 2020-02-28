package chapter_pattern.chain_of_responsibility.sample_1.decor;

import chapter_pattern.chain_of_responsibility.sample_1.TaskAttribute;
import chapter_pattern.chain_of_responsibility.sample_1.Desk;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:19 下午
 * desc   : 透明度
 * version: 1.0
 */
public class AlphaDecor implements Decor {

    @Override
    public Desk proceed(Chain chain, Desk preDesk) {
        TaskAttribute task = chain.carry();
        float alpha = task.alpha();
        if (alpha < 0 || alpha > 1) {
            Desk desk = chain.proceed(task, preDesk);
            if (desk != null) {
                desk.setAlpha(alpha);
                return desk;
            }
        }
        Desk alphaDesk = new Desk();
        alphaDesk.setAlpha(alpha);
        return alphaDesk;
    }
}
