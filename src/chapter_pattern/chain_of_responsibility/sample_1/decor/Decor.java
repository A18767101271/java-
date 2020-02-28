package chapter_pattern.chain_of_responsibility.sample_1.decor;

import chapter_pattern.chain_of_responsibility.sample_1.TaskAttribute;
import chapter_pattern.chain_of_responsibility.sample_1.Desk;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:12 下午
 * desc   :
 * version: 1.0
 */
public interface Decor {

    /**
     *
     * @param chain
     * @param preDesk
     * @return
     */
    Desk proceed(Chain chain, Desk preDesk);

    interface Chain {

        /**
         * 获取任务属性
         *
         * @return
         */
        TaskAttribute carry();

        /**
         * 获取Desk
         * @param carrier 任务
         * @param preDesk 前一个desk
         * @return
         */
        Desk proceed(TaskAttribute carrier, Desk preDesk);

    }
}
