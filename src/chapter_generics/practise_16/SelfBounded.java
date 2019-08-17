package chapter_generics.practise_16;

/**
 * Created by wislie on 2018/11/18.
 */
public class SelfBounded<T extends SelfBounded<T>> {

    T element;

    SelfBounded<T> set(T element){
        this.element = element;
        return this;
    }

    T get(){
        return element;
    }
}
