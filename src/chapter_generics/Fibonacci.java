package chapter_generics;

import java.util.Iterator;

/**
 * 斐波纳兹
 * Created by wislie on 2018/6/19.
 */
public class Fibonacci implements Generator<Integer>, Iterable<Integer> {

    private int n;
    public Fibonacci(int count){
        this.n = count;
    }

    @Override
    public Integer next() {
        return fib(n);
    }

    private int fib(int n) {
        if (n < 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }

    @Override
    public Iterator<Integer> iterator() {

        return new Iterator<Integer>() {

            @Override
            public boolean hasNext() {
                return n > 0;
            }

            @Override
            public Integer next() {
                n--;
                return Fibonacci.this.next();
            }
        };
    }
    public static void main(String[] args) {
        for(int data : new Fibonacci(18)){
            System.out.println(data);
        }
    }
}
