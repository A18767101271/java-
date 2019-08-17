package chapter_pattern.strategy;

/**
 * Created by wislie on 2018/8/30.
 */
@TravelDistance(max = 300, min = 50)
class CarStrategy extends TravelStrategy {
    @Override
    public void travel() {
        System.out.println("travel by car");
    }
}