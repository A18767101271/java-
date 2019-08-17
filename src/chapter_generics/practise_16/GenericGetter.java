package chapter_generics.practise_16;

/**
 * Created by wislie on 2018/11/18.
 */
public interface GenericGetter<T extends GenericGetter<T>> {
    T get();

    void set(T arg);
}
