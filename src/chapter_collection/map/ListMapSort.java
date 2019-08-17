package chapter_collection.map;

import java.util.*;

/**
 * 对map进行排序
 * Created by wislie on 2019/4/9.
 */
public class ListMapSort {

    public static void main(String[] args) {

        List<Map<String, String>> mapList = new ArrayList<>();

        Map<String, String> map1 = new HashMap<>();
        map1.put("cba", "wislie");
        mapList.add(map1);

        Map<String, String> map2 = new HashMap<>();
        map2.put("cba", "durant");
        mapList.add(map2);

        Map<String, String> map3 = new HashMap<>();
        map3.put("cba", "culi");
        mapList.add(map3);


        Collections.sort(mapList, new Comparator<Map<String, String>>() {
            @Override
            public int compare(Map<String, String> o1, Map<String, String> o2) {

                String key1 = o1.get("cba");
                String key2 = o2.get("cba");
                return key1.compareTo(key2);
            }
        });

        for (Map<String, String> map : mapList) {
            System.out.println("cba:" + map.get("cba"));
        }


    }
}
