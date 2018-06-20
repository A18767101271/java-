package chapter_generics;

import chapter_14.Pet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 泛型方法
 */
public class GenericsMethodSimple {

    public <T, K, V> void genericsMethod(T param1, K param2, V param3) {
        System.out.println("param1:" + param1.getClass().getName() +
                "\nparam2:" + param2.getClass().getName() +
                "\nparam3:" + param3.getClass().getName());
    }

    //param3 为非参数化的类型
    public <T, K> void genericsMethod(T param1, K param2, String param3) {
        System.out.println("param1:" + param1.getClass().getName() +
                "\nparam2:" + param2.getClass().getName() +
                "\nparam3:" + param3.getClass().getName());
    }

    public <T> T getInstance(T value) {
        return value;
    }

    public <T> void display(T value) {
        System.out.println("value:" + value);
    }

    public static <T> List<T> list() {
        return new ArrayList<T>();
    }

    public static <T> void displayList(List<T> list){
        System.out.println("value:" + list);
    }

    public static <K, V> Map<K,V> map() {
        return new HashMap<K,V>();
    }

    public static void displayMap(Map<String, List<? extends Pet>> map){
        System.out.println("map:" + map);
    }

    public static void main(String[] args) {
        GenericsMethodSimple gms = new GenericsMethodSimple();
        gms.genericsMethod("wilsie", 168, 280.0f);

        gms.genericsMethod("wislie", 18, "is different");

        //推断并不了解
        gms.display(gms.getInstance("she"));

        GenericsMethodSimple.displayList(GenericsMethodSimple.list());

        GenericsMethodSimple.displayMap(GenericsMethodSimple.map());
    }
}
