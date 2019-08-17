package chapter_generics.practise_21.sample_1;

/**
 * Created by wislie on 2019/4/29.
 */
public class Holder<T> {

    private T value;

    public Holder() {
    }

    public Holder(T value) {
        this.value = value;
    }

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}
