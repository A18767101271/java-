package chapter_generics.practise_21.sample_1;

import java.util.Arrays;
import java.util.List;

/**
 *
 * Created by wislie on 2019/4/29.
 */
public class GenericReading {

    static List<Fruit> fruits = Arrays.asList(new Fruit());
    static List<Apple> apples = Arrays.asList(new Apple());

    //体现了静态泛型方法的作用
    static <T> T readExact(List<T> list) {
        return list.get(0);
    }

    static void f1() {
        Fruit fruit = readExact(fruits);
        Apple apple = readExact(apples);
        fruit = readExact(apples);
    }

    static class Reader<T>{
        T readExact(List<T> list) {
            return list.get(0);
        }
    }

    static void f2(){
        Reader<Fruit> fruitReader = new Reader<>();
        Fruit fruit = fruitReader.readExact(fruits);
//       fruit = fruitReader.readExact(apples);  compile error
    }

    //体现了通配符的作用
    static class CovariantReader<T>{
        T readCovariant(List<? extends T> list){
            return list.get(0);
        }
    }

    static void f3(){
        CovariantReader<Fruit> fruitCovariantReader = new CovariantReader<>();
        fruitCovariantReader.readCovariant(fruits);
        fruitCovariantReader.readCovariant(apples);
    }

    public static void main(String[] args) {
        f1();
        f2();
        f3();
    }
}
