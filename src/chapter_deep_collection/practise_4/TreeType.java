package chapter_deep_collection.practise_4;

import org.jetbrains.annotations.NotNull;

/**
 * tree必须有compareTo方法
 * Created by wislie on 2018/11/29.
 */
public class TreeType extends SetType implements Comparable<TreeType> {
    public TreeType(int i) {
        super(i);
    }

    @Override
    public int compareTo(@NotNull TreeType o) {
        return this.i < o.i ? 1 :(this.i == o.i ? 0 : -1);
    }
}
