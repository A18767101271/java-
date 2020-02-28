package chapter_pattern.chain_of_responsibility.sample_1.decor;

import chapter_pattern.chain_of_responsibility.sample_1.TaskAttribute;
import chapter_pattern.chain_of_responsibility.sample_1.Desk;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:19 下午
 * desc   : 形状
 * version: 1.0
 */
public class ShapeDecor implements Decor {

    @Override
    public Desk proceed(Chain chain, Desk preDesk) {
        TaskAttribute task = chain.carry();
        Desk dimenDesk = chain.proceed(task, preDesk);
        if (dimenDesk != null) {
            dimenDesk.setShape(task.getShape());
            return dimenDesk;
        }

        //设置桌子的形状
        Desk shapeDesk = new Desk();
        shapeDesk.setShape(task.getShape());
        return shapeDesk;
    }
}
