package chapter_interface.sample_4;

/**
 * 工厂方法模式:具体的工厂对象负责生产具体的产品对象
 * Created by wislie on 2018/10/29.
 */
public class FactoryDesign {

    public static void main(String[] args) {

        ThrowerFactory factory = new CoinFactory();
        Thrower thrower = factory.getThrower();
        String result = thrower.throwing();
        System.out.print("result:" + result);
    }
}
