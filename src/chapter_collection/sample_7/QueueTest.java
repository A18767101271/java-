package chapter_collection.sample_7;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 先进先出
 * Created by wislie on 2018/10/30.
 */
public class QueueTest {

    public static void main(String[] args) {
        String s = "wislie is zhuyuli";
        Queue<String> queue = new LinkedList<>();
        for (String str : s.split(" ")) {
            queue.offer(str);
        }

        while (queue.peek() != null) {
            System.out.print(queue.poll() + " ");
        }
    }
}
