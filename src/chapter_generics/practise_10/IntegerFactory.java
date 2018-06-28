package chapter_generics.practise_10;

public class IntegerFactory implements Factory<Integer> {
    @Override
    public Integer create(String name) {
        return new Integer(name);
    }
}
