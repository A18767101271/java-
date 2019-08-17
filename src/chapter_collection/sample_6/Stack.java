package chapter_collection.sample_6;

import java.util.LinkedList;

/**
 * 栈
 * Created by wislie on 2018/10/30.
 */
public class Stack<T> {

    private LinkedList<T> storage = new LinkedList<>();

    public void push(T t) {
        storage.add(t);
    }

    public T peek() {
        return storage.getFirst();
    }

    public T pop() {
        return storage.removeLast();
    }

    public boolean isEmpty() {
        return storage.isEmpty();
    }

    @Override
    public String toString() {
        return storage.toString();
    }
}
