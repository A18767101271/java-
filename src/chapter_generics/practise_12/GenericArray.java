package chapter_generics.practise_12;

import java.util.Arrays;

/**
 * 创建泛型数组
 * Created by wislie on 2018/11/8.
 */
public class GenericArray<T> {

    private T[] arr;

    public GenericArray(int size) {
        arr = (T[]) new Object[size];
    }

    public void put(T data, int index) {
        arr[index] = data;
    }

    public T[] rep() {
        return arr;
    }

    public static void main(String[] args) {
        GenericArray<String> genericArray = new GenericArray<>(5);
        for (int i = 0; i < 5; i++) {
            genericArray.put("wislie_" + i, i);
        }
        String[] arr = genericArray.rep(); //java.lang.ClassCastException: [Ljava.lang.Object; cannot be cast to [Ljava.lang.String
//        String[] strings = (String[]) arr; //java.lang.ClassCastException: [Ljava.lang.Object; cannot be cast to [Ljava.lang.String
        System.out.println(Arrays.toString(arr));

    }
}


