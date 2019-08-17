package chapter_interface.sample_4;

/**
 * Created by wislie on 2018/10/29.
 */
public class CoinFactory implements ThrowerFactory {
    @Override
    public Thrower getThrower() {
        return new Coin();
    }
}
