package chapter_pattern.strategy;

/**
 * ConcreteStrategy(具体策略类)：
 * 2、 实现了Strategy定义的接口，提供具体的算法实现。
 * Created by wislie on 2018/8/30.
 */
@TravelDistance(max = Long.MAX_VALUE, min = 300)
class TrainStrategy extends TravelStrategy {
    @Override
    public void travel() {
        System.out.println("travel by train");
    }
}
