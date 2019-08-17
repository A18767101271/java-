package chapter_generics.practise_21;

import java.util.*;

/**
 * 优先考虑类型异构
 * Created by wislie on 2019/4/25.
 */
public class Favorites {

    private Map<Class<?>, Object> favorites = new HashMap<>();

    public <T> void putFavorite(Class<T> cls, T instance) {
        favorites.put(cls, cls.cast(instance));
    }

    public <T> T getFavorite(Class<T> cls) {
        Object instance = favorites.get(cls);
        T result = cls.cast(instance);
        return result;
    }

    public static void main(String[] args) {
        Favorites f = new Favorites();
        f.putFavorite(Integer.class, 11);
        f.putFavorite(Object.class, 1);
        System.out.println("integer的值:" + f.getFavorite(Integer.class));

        f.putFavorite(String.class, "我的未来会不会是梦");
        f.putFavorite(String.class, "是时候发挥我的能量了");
        System.out.println("string的值:" + f.getFavorite(String.class));

        f.putFavorite(String[].class, new String[]{"勇气", "现实", "努力"});
        String[] stringArray = f.getFavorite(String[].class);
        System.out.println("string[]的值:" + Arrays.toString(stringArray));

        f.putFavorite(List.class, Arrays.asList("int", "string", 1, 'a', true));
        List list = f.getFavorite(List.class);
        System.out.println("list的值:" + list);
    }
}
