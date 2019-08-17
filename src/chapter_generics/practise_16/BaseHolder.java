package chapter_generics.practise_16;

/**
 * 自限定
 * Created by wislie on 2018/11/18.
 */
public class BaseHolder<T> {

    T element;

    void set(T element){
        this.element = element;
    }

    T get(){
        return element;
    }
}
