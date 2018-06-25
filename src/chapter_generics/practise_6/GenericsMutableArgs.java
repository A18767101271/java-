package chapter_generics.practise_6;


/**
 * 泛型方法 可变参数
 */
public class GenericsMutableArgs {

    public <T> void genericsMethod(T... params) {
        for (T param : params) {
            System.out.println("param:" + param);
        }
    }

    public static void main(String[] args) {
        GenericsMutableArgs gms = new GenericsMutableArgs();
        gms.genericsMethod("wilsie", 168, 280.0f);

    }
}
