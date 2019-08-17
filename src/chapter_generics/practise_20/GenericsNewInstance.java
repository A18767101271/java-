package chapter_generics.practise_20;

public class GenericsNewInstance {

    public static void main(String[] args) {

    }
}

class NewInstance<T>{

    public NewInstance(Class<T> cls){
        try {
            cls.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
