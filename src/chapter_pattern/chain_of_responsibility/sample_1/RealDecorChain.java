package chapter_pattern.chain_of_responsibility.sample_1;

import chapter_pattern.chain_of_responsibility.sample_1.decor.Decor;

import java.util.List;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:23 下午
 * desc   : 形状->尺寸->颜色->透明度
 * version: 1.0
 */
public class RealDecorChain implements Decor.Chain {

    //下标
    private final int index;
    //处理类集合
    private final List<Decor> mDecorList;
    //任务属性
    private final TaskAttribute mCarrier;

    public RealDecorChain(int index, List<Decor> decorList, TaskAttribute carrier) {
        this.index = index;
        this.mDecorList = decorList;
        this.mCarrier = carrier;
    }

    @Override
    public TaskAttribute carry() {
        return mCarrier;
    }

    @Override
    public Desk proceed(TaskAttribute carrier, Desk preDesk) {
        if (index >= mDecorList.size()) return preDesk;
        Decor decor = mDecorList.get(index);
        RealDecorChain nextChain = new RealDecorChain(index + 1, mDecorList, mCarrier);
        Desk desk = decor.proceed(nextChain, preDesk);
        return desk;
    }
}
