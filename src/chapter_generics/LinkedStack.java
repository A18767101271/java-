package chapter_generics;



/**
 * 栈
 * Created by wislie on 2018/6/17.
 */
public class LinkedStack<T> {

    class Node<T> {

        T item;
        Node<T> next;

        public Node() {
            this.item = null;
            this.next = null;
        }

        public Node(T item, Node<T> next) {
            this.item = item;
            this.next = next;
        }

        public boolean end() {
            return item == null && next == null;
        }
    }

    private Node<T> top = new Node<T>();

    public void push(T item) {
        top = new Node<T>(item, top);
    }

    public T pop() {
        T result = top.item;
        if (!top.end()) {
            top = top.next;
        }
        return result;
    }

    public static void main(String[] args){
        String strList = "wislie is a good boy";
        LinkedStack<String> linkedStack = new LinkedStack();
        for(String str : strList.split(" ")){
            linkedStack.push(str);
        }

        String str;
        while((str = linkedStack.pop()) != null){
            System.out.println(str);
        }

    }
}
