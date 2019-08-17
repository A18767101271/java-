package chapter_generics.practise_17;

/**
 * Created by wislie on 2018/11/19.
 */
public class SerialNumbered extends Decorator {
    private static long counter = 1;
    private final long serialNumber = counter++;

    public SerialNumbered(Basic basic) {
        super(basic);
    }

    public long getSerialNumber(){
        return serialNumber;
    }
}
