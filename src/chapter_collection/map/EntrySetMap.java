package chapter_collection.map;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * Map遍历
 * Created by wislie on 2018/6/20.
 */
public class EntrySetMap {

    public static void main(String[] args) {




//        entrySetMap.put("China", 15);
//        entrySetMap.put("India", 11);
//        entrySetMap.put("Russia", 2);
//        entrySetMap.put("Japana", 1);
new Thread(new Runnable() {
    @Override
    public void run() {

        Map<String, Integer> entrySetMap = new HashMap<>();

        for(int i = 0; i < 1000000000l;  i++){
            entrySetMap.put("China", 15);
        }
        long start1 = System.currentTimeMillis();
        System.out.println("start1:"+start1);
        for (Map.Entry<String, Integer> entry : entrySetMap.entrySet()) {
            entry.getKey();
            entry.getValue();
//            System.out.println("key: " + entry.getKey() + " value:" + entry.getValue());
        }
        long end1 = System.currentTimeMillis();
        System.out.println("end1:"+start1);
        System.out.println("duration1:"+(end1-start1));
    }
}).start();


//        long start2 = System.currentTimeMillis();
//        Set<String> keySet = entrySetMap.keySet();
//        Iterator<String> itr = keySet.iterator();
//        while (itr.hasNext()){
//            String key = itr.next();
//            Integer val = entrySetMap.get(key);
////            System.out.println("key: " + key + " value:" + val);
//        }
//        long end2 = System.currentTimeMillis();
//        System.out.println("duration2:"+(end2-start2));
//        String javaVersion = System.getProperty("java.version");
//        System.out.println(javaVersion);
//
//        String version = javaVersion.replaceAll(".", "");
//        if (Integer.parseInt(strs[0]) <= 1 && Integer.parseInt(strs[1]) < 8) {
        //判断是否设置了maxpermsize
//        }
    }


}
