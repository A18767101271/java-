package chapter_generics;

/**
 * 持有对象
 * Created by wislie on 2018/6/17.
 */
public class Holder<T> {

    private T value;
    public Holder(T value){
        this.value = value;
    }

    public void set(T value){
        this.value = value;
    }

    public T get(){
        return value;
    }

    public boolean equals(Object obj) {
        return value.equals(obj);
    }
}
