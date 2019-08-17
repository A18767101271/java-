package chapter_deep_collection.practise_2.sample_2;


import chapter_generics.practise_5.Generator;

/**
 * Created by wislie on 2018/10/10.
 */
public class Letter implements Generator<Pair<Integer, String>>{

    private int num;
    private char val = 'a';
    @Override
    public Pair<Integer, String> next() {
        return new Pair<>(num++, String.valueOf(val++));
    }

    public static void main(String[] args) {
        //只要在主动调用Iterable的时候才回去调用next方法
        System.out.println(CollectionData.list(new Letter(), 11));
    }
}
