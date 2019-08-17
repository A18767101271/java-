package chapter_collection.sample_1;

import java.util.ArrayList;
import java.util.List;

/**
 * 向上转型可以像作用域其他类型一样用于泛型
 * Created by wislie on 2018/10/30.
 */
public class UpCast {

    public static void main(String[] args) {
        List<Apple> dataList = new ArrayList<>();
        dataList.add(new Apple());
        dataList.add(new Fuji()); // Fuji向上转型成了Apple
        dataList.add(new Gala());
    }
}
