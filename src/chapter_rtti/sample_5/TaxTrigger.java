package chapter_rtti.sample_5;

/**
 * Created by wislie on 2018/11/7.
 */
public class TaxTrigger implements Trigger {
    @Override
    public void makeMoney() {
        System.out.println("$500");
    }
}
