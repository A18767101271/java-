package chapter_deep_collection.practise_6.sample_2;

/**
 * Created by wislie on 2018/11/29.
 */
public class Groundhog {

    protected int number;

    public Groundhog(int number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "Groundhog #" + number;
    }

    /*@Override
    public boolean equals(Object obj) {
        return obj instanceof Groundhog && ((Groundhog) obj).number == number;
    }*/

    @Override
    public int hashCode() {
        return number;
    }
}
