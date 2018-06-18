package chapter_generics;

public class NodeSimple<T> {

    class Node<T> {
        T data;
        Node<T> next; //指向下一个节点

        public Node() {
            this.data = null;
            this.next = null;
        }

        public Node(T data) {
            this.data = data;
        }
    }

     Node<T> head;

    public void addHead(T data) {
        Node<T> node = new Node(data);
        if (head == null) {
            head = node;
        } else {
            node.next = head;
            head = node;
        }
    }

    public void delHead() {
        if (head != null) {
            Node<T> node = head.next;
            head = node;
        }
    }

    public void addTail(T data){
        Node<T> node = new Node(data);

        if(head == null){
            head = node;
            return;
        }

        Node<T> item = head;
        while(item.next != null){
            item = item.next;
        }
        item.next = node;
    }
}
