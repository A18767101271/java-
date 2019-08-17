package chapter_pattern.strategy;

/**
 * Strategy(抽象策略类)：
 * 1、 定义了一个公共接口，各种不同的算法以不同的方式实现这个接口，Context使用这个接口调用不同的算法，一般使用接口或抽象类实现。
 * Created by wislie on 2018/8/30.
 */
abstract class TravelStrategy {
    abstract void travel();
}
