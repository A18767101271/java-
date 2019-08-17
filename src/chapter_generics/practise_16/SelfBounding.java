package chapter_generics.practise_16;

/**
 * Created by wislie on 2018/11/18.
 */
public class SelfBounding extends SelfBounded<SelfBounding> {

    public static void main(String[] args){
        SelfBounding a = new SelfBounding();
        a.set(new SelfBounding());
        a.get();
    }
}
