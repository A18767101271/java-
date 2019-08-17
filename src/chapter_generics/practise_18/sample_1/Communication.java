package chapter_generics.practise_18.sample_1;

import chapter_generics.practise_18.Mime;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 反射的方式
 * Created by wislie on 2018/11/20.
 */
public class Communication {

    public static void main(String[] args) {
        Class<?> cls = Mime.class;
        Method[] methods = cls.getDeclaredMethods();
        if (methods != null && methods.length > 0) {

            try {
                for (Method m : methods) {
                    if(!m.getName().equals("swim")) {
                        m.invoke(cls.newInstance()); //walk sit
                    }else{
                        m.invoke(cls.newInstance(), "100 meters");
                    }
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                e.printStackTrace();
            }
        }
    }
}
