package chapter_deep_collection.practise_2.sample_3;

import chapter_deep_collection.practise_2.sample_2.Pair;
import chapter_generics.practise_5.Generator;

import java.util.HashMap;

/**
 * Created by wislie on 2018/11/28.
 */
public class MapData<K, V> extends HashMap<K, V> {

    public MapData(Generator<K> k, Generator<V> v, int quantity) {
        for (int i = 0; i < quantity; i++) {
            put(k.next(), v.next());
        }
    }

    public MapData(Generator<K> k, V v, int quantity) {
        for (int i = 0; i < quantity; i++) {
            put(k.next(), v);
        }
    }

    public MapData(Generator<K> k, Iterable<V> v) {
        for (V value : v) {
            put(k.next(), value);
        }
    }

    public MapData(Iterable<K> k, Generator<V> v) {
        for (K key : k) {
            put(key, v.next());
        }
    }

    public MapData(Generator<Pair<K, V>> generator, int quantity) {
        for (int i = 0; i < quantity; i++) {
            Pair<K, V> pair = generator.next();
            put(pair.getKey(), pair.getValue());
        }
    }

    public static <K, V> MapData<K, V> map(Generator<K> k, Generator<V> v, int quantity) {
        return new MapData(k, v, quantity);
    }

    public static <K, V> MapData<K, V> map(Generator<K> k, V v, int quantity) {
        return new MapData(k, v, quantity);
    }

    public static <K, V> MapData<K, V> map(Generator<K> k, Iterable<V> v) {
        return new MapData(k, v);
    }

    public static <K, V> MapData<K, V> map(Iterable<K> k, Generator<V> v) {
        return new MapData(k, v);
    }

    public static <K, V> MapData<K, V> map(Generator<Pair<K, V>> generator, int quantity) {
        return new MapData(generator, quantity);
    }

}
