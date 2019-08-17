package chapter_collection.sample_6;

/**
 * Created by wislie on 2018/10/30.
 */
public class StackTest {

    public static void main(String[] args) {
        String s = "wislie is zhuyuli";
        Stack<String> stack = new Stack<>();
        for (String str : s.split(" ")) {
            stack.push(str);
        }

        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
    }
}
