package chapter_generics.practise_17;

import java.util.Date;

/**
 * Created by wislie on 2018/11/19.
 */
public class TimeStamp extends Decorator {

    private final long timeStamp;
    public TimeStamp(Basic basic) {
        super(basic);
        timeStamp = new Date().getTime();
    }

    public long getTimeStamp(){
        return timeStamp;
    }
}
