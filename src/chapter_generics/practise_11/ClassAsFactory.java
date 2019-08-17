package chapter_generics.practise_11;

/**
 * Created by wislie on 2018/11/8.
 */
public class ClassAsFactory<T> {

    T x;
    public ClassAsFactory(Class<T> kind){
        try {
            x = kind.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
            ClassAsFactory<String> factory = new ClassAsFactory<>(String.class);
        }catch (Exception e){
            System.out.println("create instance failed");
        }

    }
}
