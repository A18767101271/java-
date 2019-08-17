package chapter_rtti.sample_1;

/**
 * Created by wislie on 2018/11/6.
 */
public class InitialClass {

    public static void main(String[] args) {

        System.out.println(Initiable1.CONSTANT_1);//18
        System.out.println(Initiable1.CONSTANT_2);
        //wislie is zhuyuli
        //26
        try {
            Class.forName("chapter_rtti.sample_1.Initiable2"); //precious time
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println(Initiable2.CONSTANT_3);//38
    }
}
