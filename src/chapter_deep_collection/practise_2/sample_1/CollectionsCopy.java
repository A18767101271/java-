package chapter_deep_collection.practise_2.sample_1;

import chapter_generics.practise_5.CountObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Collections 复制的两种方式
 * Created by wislie on 2018/10/10.
 */
public class CollectionsCopy {

    public static void main(String[] args) {
        //复制
        List<CountObject> ants = new ArrayList<>(Collections.nCopies(4, new CountObject()));
        System.out.println(ants);//[CountObject:0, CountObject:0, CountObject:0, CountObject:0]

        //fill 只复制 不新增
        Collections.fill(ants, new CountObject());
        System.out.println(ants);//[CountObject:1, CountObject:1, CountObject:1, CountObject:1]
    }
}

