package chapter_deep_collection.practise_6;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by wislie on 2019/1/21.
 */
public class Test {


    private static List<String> oldList = new ArrayList<>();

    public static void main(String[] args) {
        oldList.addAll(Arrays.asList("a", "b", "c"));
        List<String> newList = new ArrayList<>();
        newList.addAll(Arrays.asList("a", "b", "c", "d"));

        boolean isContains = isContainsAll(newList);
        System.out.println("isContains:" + isContains);
    }


    private static boolean isContainsAll(List<String> dataList) {

        if (oldList.size() == 0) return true;
        boolean isContains = false;
        for (int i = 0; i < oldList.size(); i++) {

            String oldData = oldList.get(i);
            for (int j = 0; j < dataList.size(); j++) {

                String data = dataList.get(j);
                if (!oldData.equals(data)) {
                    isContains = false;
                    continue;
                }
                isContains = true;
                break;
            }

            if (!isContains) return false;
        }
        return true;
    }
}
