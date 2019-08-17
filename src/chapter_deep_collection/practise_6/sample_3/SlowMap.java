package chapter_deep_collection.practise_6.sample_3;

import chapter_deep_collection.practise_2.sample_4.Countries;

import java.util.*;

/**
 * Created by wislie on 2018/11/29.
 */
public class SlowMap<K, V> extends AbstractMap<K, V> {


    private List<K> keyList = new ArrayList<>();
    private List<V> valueList = new ArrayList<>();

    @Override
    public V put(K key, V value) {
        V oldValue = get(key);
        int index = keyList.indexOf(key);
        if (oldValue == null) {
            if (index == -1) {
                keyList.add(key);
                valueList.add(value);
            }
        } else {
            if (index != -1) {
                valueList.set(index, value);
            }
        }
        return oldValue;
    }

    @Override
    public V get(Object key) {
        int index = keyList.indexOf(key);
        if (index != -1) return valueList.get(index);
        return null;
    }

    @Override
    public Set<Entry<K, V>> entrySet() {
        Set<Map.Entry<K, V>> set = new HashSet<>();
        Iterator<K> keySet = keyList.iterator();
        Iterator<V> valueSet = valueList.iterator();
        while (keySet.hasNext()) {
            K key = keySet.next();
            V value = valueSet.next();
            set.add(new MapEntry<>(key, value));
        }
        return set;
    }

    public static void main(String[] args) {
        SlowMap<String, String> m = new SlowMap<>();
        Map<String, String> map = Countries.capitals(6);
        m.putAll(map);
        System.out.println(m);//打印的时候会调用entrySet()

    }
}
