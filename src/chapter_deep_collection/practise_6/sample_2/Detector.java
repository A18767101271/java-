package chapter_deep_collection.practise_6.sample_2;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

/**
 * hashcode() 和 equals
 * Created by wislie on 2018/11/29.
 */
public class Detector {

    private static void detectGroundhog(Class<Groundhog> cls) {

        try {
            Constructor<Groundhog> ghogConstructor = cls.getConstructor(int.class);
            Map<Groundhog,Prediction> map = new HashMap<>();
            for(int i = 0; i < 5; i++){
                Groundhog ghog = ghogConstructor.newInstance(i);
                map.put(ghog, new Prediction());
            }
            System.out.println(map);

            Groundhog gh = ghogConstructor.newInstance(3);
            System.out.println("gh:"+gh);
            if(map.containsKey(gh)){
                System.out.println("containsKey");
            }else{
                System.out.println("not containsKey"); //为什么会not containsKey
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        detectGroundhog(Groundhog.class);
    }
}
