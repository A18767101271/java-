package chapter_pattern.strategy;

/**
 * Created by wislie on 2018/8/30.
 */
@TravelDistance(max = 10)
class WalkStrategy extends TravelStrategy {
    @Override
    public void travel() {
        System.out.println("travel by walking");
    }
}
