package chapter_deep_collection.practise_6.sample_1;

import chapter_deep_collection.practise_2.sample_4.Countries;

import java.util.List;

/**
 * Created by wislie on 2018/11/29.
 */
public class AssociativeArray<K, V> {

    private Object[][] pairs;
    private int index;

    public AssociativeArray(int length) {
        pairs = new Object[length][2];
    }

    public void put(K key, V value) {
        if (index >= pairs.length)
            throw new ArrayIndexOutOfBoundsException();
        pairs[index][0] = key;
        pairs[index][1] = value;
        index++;
    }

    public V get(K key) {
        for (int i = 0; i < pairs.length; i++) {
            if (key.equals(pairs[i][0])) {
                return (V) pairs[i][1];
            }
        }
        return null;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < pairs.length; i++) {
            builder.append(pairs[i][0]).append("=").append(pairs[i][1]).append("\n");
        }
        return builder.toString();
    }

    public static void main(String[] args) {
        int size = 5;
        AssociativeArray<String, String> array = new AssociativeArray<>(size);
        List<String> nameList = Countries.names(size);
        for (int i = 0; i < size; i++) {
            array.put(nameList.get(i), "i-" + i);
        }
        System.out.println(array);
        String value = array.get(nameList.get(0));
        System.out.println(value);
    }
}
