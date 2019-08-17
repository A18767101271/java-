package chapter_rtti.sample_2;

import chapter_rtti.Cat;

/**
 * Created by wislie on 2018/11/6.
 */
public class SuperClassReference {

    public static void main(String[] args) {

        try {
            Class<Cat> catCls = Cat.class;
            Cat cat = catCls.newInstance();

            //编译器将只允许声明超类引用是“某个类，它是X类的超类" --- ? super Cat
            Class<? super Cat> superCatCls = catCls.getSuperclass();
            Object obj = superCatCls.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
