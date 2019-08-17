package chapter_generics.practise_17;

/**
 * Created by wislie on 2018/11/19.
 */
public class Decorator extends Basic {

    private Basic basic;
    public Decorator(Basic basic){
        this.basic = basic;
    }

    public void set(String value){
        basic.setValue(value);
    }

    public String get(){
        return basic.getValue();
    }
}
