package chapter_generics.practise_15;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.List;

/**
 * Created by wislie on 2018/11/18.
 */
public class FixedStack<T> {

    private int index = 0;
    private Object[] storage;

    public FixedStack(int size) {
        storage = new Object[size];
    }

    public void push(T item) {
        storage[index++] = item;
    }

    public T pop() {
        return (T) storage[--index];
    }

    public static void main(String[] args) {
        String[] strArr = "wislie needs to be patient".split(" ");
        FixedStack<String> stack = new FixedStack<>(strArr.length);
        for (int i = 0; i < strArr.length; i++) {
            stack.push(strArr[i]);
        }

        System.out.println(stack.pop()); //patient


    }
}
