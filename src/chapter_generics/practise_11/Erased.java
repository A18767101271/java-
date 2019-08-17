package chapter_generics.practise_11;

/**
 * Created by wislie on 2018/11/8.
 */
public class Erased<T> {

    private final int SIZE = 10;
    //编译无法通过
    /*private static void f(Object obj){
        obj instanceof T; //error
        T data = new T(); //error
        T[] array = new T[SIZE];//error

    }*/
}
