package chapter_poly.sample_5;

/**
 * 协变返回
 * Created by wislie on 2018/10/26.
 */
public class CovariantReturn {

    public static void main(String[] args) {
        BaseTransport transport = new BaseTransport();
        transport.getCycle(); //Bicycle
        transport = new AdvanceTransport();
        transport.getCycle();//Unicycle
    }
}
