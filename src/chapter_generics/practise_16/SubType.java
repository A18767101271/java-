package chapter_generics.practise_16;

/**
 * Created by wislie on 2018/11/18.
 */
public class SubType extends BaseHolder<SubType> {

    public static void main(String[] args){
        SubType st1 = new SubType();
        SubType st2 = new SubType();

        st1.set(st2);
        SubType subType = st1.get();
        System.out.println(subType);//wislie jiayou

    }

    @Override
    public String toString() {
        return "wislie jiayou";
    }
}
