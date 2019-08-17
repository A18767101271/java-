package chapter_rtti.sample_4;

/**
 * Created by wislie on 2018/11/7.
 */
public interface Factory<T> {

    T create(); //泛型参数T使得create()可以在每种Factory实现中返回不同的类型，这也充分利用了协变返回类型
}
