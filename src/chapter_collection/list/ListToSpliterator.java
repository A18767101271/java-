package chapter_collection.list;

import java.util.ArrayList;
import java.util.List;
import java.util.Spliterator;
import java.util.function.Consumer;

/**
 * 将List切割成多个
 */
public class ListToSpliterator {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        for (int i = 1; i < 10; i++) {
            list.add("data-" + i);
        }
        Spliterator<String> spliterator = list.spliterator();
        Spliterator<String> spliteratorPart1 = spliterator.trySplit();
        Spliterator<String> spliteratorPart2 = spliterator.trySplit();
        Spliterator<String> spliteratorPart3 = spliterator.trySplit();

        spliteratorPart1.forEachRemaining(s -> {
            System.out.print(s + " ");
        });

        System.out.println(" ");
        spliteratorPart2.forEachRemaining(s -> {
            System.out.print(s + " ");
        });

        System.out.println(" ");
        spliteratorPart3.forEachRemaining(s -> {
            System.out.print(s + " ");
        });

        System.out.println(" ");
        spliterator.forEachRemaining(s -> {
            System.out.print(s + " ");
        });


    }
}
