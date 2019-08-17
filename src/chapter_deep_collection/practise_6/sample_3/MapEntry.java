package chapter_deep_collection.practise_6.sample_3;

import java.util.Map;

/**
 * Created by wislie on 2018/11/29.
 */
public class MapEntry<K, V> implements Map.Entry<K, V> {

    private K key;
    private V value;

    public MapEntry(K key, V value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public K getKey() {
        return key;
    }

    @Override
    public V getValue() {
        return value;
    }

    @Override
    public V setValue(V value) {
//        V result = this.value;//搞不懂
//        this.value = value;
//        return result;
        return null;
    }

    @Override
    public int hashCode() {
        return (key == null ? 0 : key.hashCode())
                ^ (value == null ? 0 : value.hashCode());
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof MapEntry)) return false;
        MapEntry me = (MapEntry) obj;
        return (key == null ? me.getKey() == null :
                key.equals(me.getKey())) &&
                (value == null ? me.getValue() == null :
                        value.equals(me.getValue()));

    }

    @Override
    public String toString() {
        return key + "=" + value;
    }
}
