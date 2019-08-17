package chapter_deep_collection.practise_4;


/**
 * hash必须有hashCode()
 * Created by wislie on 2018/11/29.
 */
public class HashType extends SetType {

    public HashType(int i) {
        super(i);
    }

    @Override
    public int hashCode() {
        return i;
    }
}
