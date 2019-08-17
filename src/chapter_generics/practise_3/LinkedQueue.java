package chapter_generics.practise_3;

public class LinkedQueue {

    public static void main(String[] args) {
        NodeSimple stack = new NodeSimple();
        String str = "wislie is a good boy";
        for (String data : str.split(" ")) {
            stack.addTail(data);
        }

        while (stack.head != null) {
            System.out.println(" " + stack.head.data);
            stack.head = stack.head.next;
        }
    }
}
