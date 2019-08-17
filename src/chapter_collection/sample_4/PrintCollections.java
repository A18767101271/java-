package chapter_collection.sample_4;

import java.util.*;

/**
 * 容器的打印
 * Created by wislie on 2018/10/30.
 */
public class PrintCollections {

    private static Collection fill(Collection<String> collection){
        collection.add("dog");
        collection.add("cat");
        collection.add("rat");
        collection.add("dog");
        return collection;
    }

    private static Map fill(Map<String, String> map){
        map.put("dog","black");
        map.put("cat","yellow");
        map.put("rat","white");
        map.put("dog","gray");
        return map;
    }

    private static void printCollection(Collection collection){
        System.out.println(collection);
    }

    private static void printMap(Map map){
        System.out.println(map);
    }

    public static void main(String[] args) {

        printCollection(fill(new ArrayList<>()));
        printCollection(fill(new LinkedList<>()));
        printCollection(fill(new HashSet<>()));
        printCollection(fill(new LinkedHashSet<>()));
        printCollection(fill(new TreeSet<>()));

        printMap(fill(new HashMap<>()));
        printMap(fill(new TreeMap<>()));
        printMap(fill(new LinkedHashMap<>()));
    }
}
