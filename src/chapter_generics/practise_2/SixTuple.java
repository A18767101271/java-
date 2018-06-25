package chapter_generics.practise_2;

/**
 * 元组
 * Created by wislie on 2018/6/17.
 */
public class SixTuple<A, B, C, D, E, F> extends FiveTuple<A, B, C, D, E> {

    public final F six;

    public SixTuple(A first, B second, C three, D four, E five, F six) {
        super(first, second, three, four, five);
        this.six = six;
    }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ", " + three + ", " + four + ", " + five + ", " + six + ")";
    }


    public static void main(String[] args) {
        SixTuple<String, Integer, Float, Double, Long, Character> tuple = new  SixTuple("wislie", 20, 30.0, 40.0, 50, 'z');
        System.out.println(tuple);
    }
}

class TwoTuple<A, B> {

    public final A first;
    public final B second;

    public TwoTuple(A first, B second) {
        this.first = first;
        this.second = second;
    }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

class ThreeTuple<A, B, C> extends TwoTuple<A, B> {

    public final C three;

    public ThreeTuple(A first, B second, C three) {
        super(first, second);
        this.three = three;
    }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ", " + three + ")";
    }
}

class FourTuple<A, B, C, D> extends ThreeTuple<A, B, C> {

    public final D four;

    public FourTuple(A first, B second, C three, D four) {
        super(first, second, three);
        this.four = four;
    }


    @Override
    public String toString() {
        return "(" + first + ", " + second + ", " + three + "," + four + ")";
    }
}

class FiveTuple<A, B, C, D, E> extends FourTuple<A, B, C, D> {

    public final E five;

    public FiveTuple(A first, B second, C three, D four, E five) {
        super(first, second, three, four);
        this.five = five;
    }


    @Override
    public String toString() {
        return "(" + first + ", " + second + ", " + three + "," + four + "," + five + ")";
    }
}


