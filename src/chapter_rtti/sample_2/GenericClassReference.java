package chapter_rtti.sample_2;

/**
 * Created by wislie on 2018/11/6.
 */
public class GenericClassReference {

    public static void main(String[] args) {
        Class<?> cls = int.class;
        cls = double.class;

        Class<? extends Number> bounded = int.class;
        bounded = double.class;

    }
}
