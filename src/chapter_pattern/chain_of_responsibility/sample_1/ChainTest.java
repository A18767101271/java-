package chapter_pattern.chain_of_responsibility.sample_1;

import chapter_pattern.chain_of_responsibility.sample_1.decor.*;

import java.util.ArrayList;
import java.util.List;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 5:15 下午
 * desc   :
 * version: 1.0
 */
public class ChainTest {

    public static void main(String[] args) {

        List<Decor> mDecorList = new ArrayList<>();
        mDecorList.add(new ShapeDecor());
        mDecorList.add(new DimenDecor());
        mDecorList.add(new ColorDecor());
        mDecorList.add(new AlphaDecor());

        TaskAttribute carrier = new TaskAttribute();
        RealDecorChain chain = new RealDecorChain(0, mDecorList, carrier);
        Desk desk = chain.proceed(carrier, null);
        System.out.println(desk);
    }
}
