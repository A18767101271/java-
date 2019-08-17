package chapter_rtti.sample_5;

import java.lang.reflect.Proxy;

/**
 * dong tai dai li
 * Created by wislie on 2018/11/7.
 */
public class DynamicDemo {
    public static void main(String[] args) {

        Trigger trigger = (Trigger) Proxy.newProxyInstance(Trigger.class.getClassLoader(),
                new Class[]{Trigger.class},  new DynamicProxyHandler(new TaxTrigger()));
        trigger.makeMoney();//$500
    }
}
