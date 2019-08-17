package chapter_io.practise_4.sample_2;

import java.io.Serializable;

/**
 * Created by wislie on 2018/12/11.
 */
public class Ant implements Serializable {

    private String name;
    private int size;

    public Ant(String name, int size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public String toString() {
        return "name:" + name + " size:" + size;
    }
}
