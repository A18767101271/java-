package chapter_poly.sample_2;

/**
 * 多态不能覆盖私有方法
 * Created by wislie on 2018/10/26.
 */
public class PrivateMethodSample {
    private void show(){
        System.out.println("private show");
    }

    public static void main(String[] args) {
        PrivateMethodSample obj = new Derived();
        obj.show(); //private show
    }
}