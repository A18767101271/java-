package chapter_deep_collection.practise_1.sample_2;

import java.util.WeakHashMap;

/**
 * Created by wislie on 2018/11/22.
 */
public class CanonicalMapping {

    public static void main(String[] args) {

        WeakHashMap<Key, Value> weakHashMap = new WeakHashMap<>();
        int size = 10;
        Key[] keys = new Key[size];

        for (int i = 0; i < size; i++) {
            Key key = new Key(String.valueOf(i));
            Value value = new Value(String.valueOf(i));
            if (i % 2 == 0) {
                keys[i] = key; //键被存入了keys数组,所以这些对象不能被垃圾回收器回收
            }
            weakHashMap.put(key, value);
        }
        System.gc(); //垃圾回收finalize()
//        Finalizing Key 9
//        Finalizing Key 7
//        Finalizing Key 5
//        Finalizing Key 3
//        Finalizing Key 1
    }
}
