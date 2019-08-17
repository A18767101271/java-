package chapter_generics.practise_21;

/**
 * Created by wislie on 2019/4/24.
 */
public class Stack<E> {

    private E[] elements;
    private int size;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    @SuppressWarnings("unchecked")
    public Stack() {
        elements = (E[]) new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(E e) {
        if (elements[size] != null) {
            throw new ArrayIndexOutOfBoundsException("数组下标越界 size大于" + DEFAULT_INITIAL_CAPACITY);
        }
        elements[size++] = e;
    }

    public E pop() {
        if (size == 0) {
            throw new ArrayIndexOutOfBoundsException("数组下标越界 size小于0");
        }
        E e = elements[--size];
        elements[size] = null;
        return e;
    }

    public static void main(String[] args) {
        Stack<String> stringStack = new Stack<>();
        stringStack.push("很多时间被浪费");
        stringStack.push("人生就会变得无望");
        String popString = stringStack.pop();
        System.out.println("popString:" + popString);
    }
}
