package chapter_deep_collection.practise_4;

/**
 * Created by wislie on 2018/11/29.
 */
public class SetType {

    int i;
    public SetType(int i){
        this.i = i;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof SetType && (i == ((SetType) obj).i);
    }

    @Override
    public String toString() {
        return String.valueOf(i);
    }
}
