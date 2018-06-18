package chapter_generics;

/**
 * Created by wislie on 2018/6/17.
 */
public class LinkedQueue<T> {

    class Node<T>{

        T item;
        Node<T> top; //每个Node的top都是同一个
        Node<T> next; //next都是指向下一个


        public Node(){
            item = null;
            next = null;
        }

        public Node(Node<T> top, T item, Node<T> next){
            this.top = top;
            this.item = item;
            this.next = next;
        }

        public boolean end() {
            return item == null && next == null;
        }
    }
    private Node<T> top = new Node<>();

    public void push(T item){

        Node node = new Node(top, item, null);
        if(top.next == null){
            top.next = node;
        }


    }
    public static void main(String[] args){


    }


//    public T pop(){
//        T result = top.item;
//
//        return result;
//    }
}
