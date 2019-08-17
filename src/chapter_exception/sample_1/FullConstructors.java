package chapter_exception.sample_1;

/**
 * 自定义exception
 * Created by wislie on 2018/11/1.
 */
public class FullConstructors {

    public static void main(String[] args) {

        try {
            f();
        } catch (MyException e) {
            e.printStackTrace(System.out);
        }

        try {
            g();
        } catch (MyException e) {
            e.printStackTrace(System.out);
        }

        try {
            k();
        } catch (ArrayIndexOutOfBoundsException e) {
            e.printStackTrace(System.out);
        }

    }

    private static void f() throws MyException {
        System.out.println("f exception");
        throw new MyException();
    }

    private static void g() throws MyException {
        System.out.println("g exception");
        throw new MyException("g throws exception");
    }

    private static void k() throws ArrayIndexOutOfBoundsException{
        int[] arr = new int[5];
        if(arr[5] >= 5);
        throw new ArrayIndexOutOfBoundsException("k throws exception");
    }
}
