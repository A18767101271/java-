package chapter_generics.practise_17;

/**
 * 装饰者模式
 * Created by wislie on 2018/11/19.
 */
public class Decoration {

    public static void main(String[] args) {
        Basic basic = new Basic();
        basic.setValue("wislie jiayou");
        TimeStamp timeStamp = new TimeStamp(basic);
        SerialNumbered serialNumbered = new SerialNumbered(basic);
        System.out.println("value:" + timeStamp.get() +
                " timeStamp:" + timeStamp.getTimeStamp());
        //value:wislie jiayou timeStamp:1542637476452
        System.out.println("value:" + serialNumbered.get() +
                " serialNumbered:" + serialNumbered.getSerialNumber());
        //value:wislie jiayou serialNumbered:1
    }
}
