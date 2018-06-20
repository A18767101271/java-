package chapter_collection.map;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Map遍历
 * Created by wislie on 2018/6/20.
 */
public class EntrySetMap {

    public static void main(String[] args) {

        Map<String, Integer> entrySetMap = new HashMap<>();

        entrySetMap.put("China", 15);
        entrySetMap.put("India", 11);
        entrySetMap.put("Russia", 2);
        entrySetMap.put("Japana", 1);


        for (Map.Entry<String, Integer> entry : entrySetMap.entrySet()) {
            System.out.println("key: " + entry.getKey() + " value:" + entry.getValue());
        }
        String javaVersion = System.getProperty("java.version");
        System.out.println(javaVersion);

        String version = javaVersion.replaceAll(".", "");
//        if (Integer.parseInt(strs[0]) <= 1 && Integer.parseInt(strs[1]) < 8) {
        //判断是否设置了maxpermsize
//        }
    }
}
