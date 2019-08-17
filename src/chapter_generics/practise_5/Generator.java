package chapter_generics.practise_5;

import java.util.Collection;

/**
 * 生成器
 * Created by wislie on 2018/6/19.
 */
public interface Generator<T> {

    T next();

    static <T> Collection<T>
    fill(Collection<T> coll, Generator<T> gen, int n) {
        for (int i = 0; i < n; i++)
            coll.add(gen.next());
        return coll;
    }


}
