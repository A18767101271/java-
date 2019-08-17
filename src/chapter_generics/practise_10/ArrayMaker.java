package chapter_generics.practise_10;

import java.lang.reflect.Array;
import java.util.Arrays;

/**
 * Created by wislie on 2018/11/8.
 */
public class ArrayMaker<T> {

    private Class<T> cls;

    public ArrayMaker(Class<T> cls) {
        this.cls = cls;
    }

    public T[] createArray(int size) {
        T[] arr = (T[]) Array.newInstance(cls, size);
        return arr;
    }

    public static void main(String[] args) {
        ArrayMaker<String> maker = new ArrayMaker<>(String.class);
        String[] strings = maker.createArray(5);
        System.out.println(Arrays.toString(strings));
        //[null, null, null, null, null]
    }
}


