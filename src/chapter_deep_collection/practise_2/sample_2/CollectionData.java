package chapter_deep_collection.practise_2.sample_2;

import chapter_generics.practise_5.Generator;

import java.util.ArrayList;

/**
 * 添加数据
 * Created by wislie on 2018/10/10.
 */
public class CollectionData<T> extends ArrayList<T> {

    public CollectionData(Generator<T> generator, int quantity){
        for(int i = 0; i< quantity; i++){
            add(generator.next());
        }
    }

    public static <T> CollectionData<T> list(Generator<T> generator, int quantity){
        return new CollectionData<>(generator, quantity);
    }
}
