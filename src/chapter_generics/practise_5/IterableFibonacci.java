package chapter_generics.practise_5;

import org.jetbrains.annotations.NotNull;

import java.util.Iterator;

/**
 * Created by wislie on 2018/11/8.
 */
public class IterableFibonacci extends Fibonacci implements Iterable<Integer> {

    private int count;

    IterableFibonacci(int count) {
        this.count = count;
    }

    @NotNull
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {

            @Override
            public boolean hasNext() {
                return count-- > 0;
            }

            @Override
            public Integer next() {
                return IterableFibonacci.this.next();
            }
        };
    }

    public static void main(String[] args) {
        for (int data : new IterableFibonacci(18)) {
            System.out.print(data + " ");//1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584
        }
    }
}
