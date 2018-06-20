package chapter_collection.list;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wislie on 2018/6/19.
 */
public class ListRemove {

    public static void main(String[] args) {

        List<String> list = new ArrayList<String>();
        list.add("1");
        list.add("2");
        /*for (String item : list) {
            if ("1".equals(item)) {
                list.remove(item);
            }
        }*/

        for (String item : list) {
            if ("2".equals(item)) {
                list.remove(item);
            }
        }
    }
}
