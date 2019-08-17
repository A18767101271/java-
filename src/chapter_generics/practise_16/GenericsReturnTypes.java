package chapter_generics.practise_16;

/**
 * Created by wislie on 2018/11/18.
 */
public class GenericsReturnTypes implements Getter{

    static void test(Getter g){
        Getter result = g.get();

        GenericGetter gg = g.get();

        result.set(g);
//        result.set(gg); compile error
    }

    public static void main(String[] args){
        GenericsReturnTypes types = new GenericsReturnTypes();
        test(types);
    }

    @Override
    public Getter get() {
        return this;
    }

    @Override
    public void set(Getter arg) { //这个方法接受导出类型而不是基类型为参数

    }
}
