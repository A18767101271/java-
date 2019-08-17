package chapter_generics.practise_14;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wislie on 2018/11/9.
 */
public class UnboundedCards {

    static Map map1;
    static Map<?,?> map2;
    static Map<String,?> map3;
    static void setMap1(Map map){
        map1 = map;
    }

    static void setMap2(Map<?,?> map){
        map2 = map;
    }

    static void setMap3(Map<String,?> map){
        map3 = map;
    }

    public static void main(String[] args) {
        setMap1(new HashMap());
        setMap2(new HashMap());
        setMap3(new HashMap());
        setMap1(new HashMap<String,Integer>());
        setMap2(new HashMap<String,Integer>());
        setMap3(new HashMap<String,Integer>());
    }
}
