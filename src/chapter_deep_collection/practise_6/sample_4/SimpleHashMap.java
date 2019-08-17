package chapter_deep_collection.practise_6.sample_4;

import chapter_deep_collection.practise_2.sample_4.Countries;
import chapter_deep_collection.practise_6.sample_3.MapEntry;

import java.util.*;

/**
 * 散列
 * Created by wislie on 2018/12/5.
 */
public class SimpleHashMap<K, V> extends AbstractMap<K, V> {

    private static final int SIZE = 20;
    private LinkedList<MapEntry<K, V>>[] linkedList = new LinkedList[SIZE];


    @Override
    public V put(K key, V value) {

        V oldValue = null;
        int index = Math.abs(key.hashCode()) % SIZE;
        if (linkedList[index] == null) {
            linkedList[index] = new LinkedList<>();
        }

        boolean found = false;
        MapEntry newEntry = new MapEntry(key, value);
        ListIterator<MapEntry<K, V>> listIterator = linkedList[index].listIterator();
        while (listIterator.hasNext()) {
            MapEntry<K, V> mapEntry = listIterator.next();
            if (mapEntry.getKey().equals(key)) {
                listIterator.set(newEntry);
                found = true;
                oldValue = mapEntry.getValue();
                break;
            }
        }

        if (!found) {
//            oldValue = value; 为什么不设置oldValue
            linkedList[index].add(newEntry);
        }

        return oldValue;
    }

    @Override
    public V get(Object key) {
        int index = Math.abs(key.hashCode()) % SIZE;
        if (linkedList[index] == null) return null;

        ListIterator<MapEntry<K, V>> listIterator = linkedList[index].listIterator();

        while (listIterator.hasNext()) {
            MapEntry<K, V> mapEntry = listIterator.next();
            if (mapEntry.getKey().equals(key)) {
                return mapEntry.getValue();
            }
        }
        return null;
    }

    @Override
    public Set<Entry<K, V>> entrySet() {
        Set<Map.Entry<K, V>> set = new HashSet<>();
        for (LinkedList<MapEntry<K, V>> list : linkedList) {
            if (list == null) continue;
            ListIterator<MapEntry<K, V>> listIterator = list.listIterator();
            while (listIterator.hasNext()) {
                MapEntry<K, V> newMapEntry = listIterator.next();
                set.add(newMapEntry);
            }
        }
        return set;
    }

    public static void main(String[] args) {
        SimpleHashMap<String, String> m = new SimpleHashMap<>();
        Map<String, String> map = Countries.capitals(100);
        m.putAll(map);
        System.out.println(m);
        System.out.println(m.get("BOTSWANA"));
        System.out.println(m.entrySet());

    }
}
