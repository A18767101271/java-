package chapter_generics.practise_11;

public class GenericsArray {
    static Generic<Integer>[] gia;

    public static void main(String[] args) {
        gia = new Generic[20];
        System.out.print(gia.getClass().getSimpleName());
    }
}

class Generic<T> {

}




