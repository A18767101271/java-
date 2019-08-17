package chapter_deep_collection.practise_6.sample_6;

import chapter_deep_collection.practise_6.sample_2.Groundhog;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by wislie on 2019/1/10.
 */
public class CollectionToJson {

    public static void main(String[] args) {

        Map<String, String> stringMap = new HashMap<>();
        stringMap.put("json", "");
        System.out.println("stringMap:" + stringMap);

        System.out.println("json:" + JsonUtil.toJson(stringMap));

        Groundhog gh = new Groundhog(18);
        System.out.println("gh:" + JsonUtil.object2Json(gh));
    }
}
