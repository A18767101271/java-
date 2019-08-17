package chapter_generics.practise_5;


/**
 * 斐波纳兹 数列
 * Created by wislie on 2018/6/19.
 */
public class Fibonacci implements Generator<Integer> {

    private int count = 0;

    @Override
    public Integer next() {
        return fib(count++); //入口
    }

    protected int fib(int n) {
        if (n < 2) return 1;
        return fib(n - 1) + fib(n - 2);
    }
}
