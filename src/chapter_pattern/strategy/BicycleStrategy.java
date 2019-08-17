package chapter_pattern.strategy;

/**
 * Created by wislie on 2018/8/30.
 */
@TravelDistance(max = 50, min = 10)
class BicycleStrategy extends TravelStrategy {
    @Override
    public void travel() {
        System.out.println("travel by bicycle");
    }
}
