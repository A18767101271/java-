package chapter_generics.practise_18.sample_2;

import chapter_generics.practise_18.Mime;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wislie on 2018/11/20.
 */
public class Apply {

    private static <T, S extends Iterable<? extends T>> void
    apply(S seq, Method method, Object... args) {

        try {
            for (T t : seq) {
                method.invoke(t, args);
            }
        } catch (IllegalAccessException e) {
            System.out.println("IllegalAccessException:" + e.getMessage());
        } catch (InvocationTargetException e) {
            System.out.println("InvocationTargetException:" + e.getMessage());
        }
    }

    public static void main(String[] args) {
        List<Mime> mimeList = new ArrayList<>();
        mimeList.add(new Mime("洪淑华"));
        Method[] methods = Mime.class.getDeclaredMethods();
        for (int i = 0; i < methods.length; i++) {
            //方法参数数量
            int parameterCount = methods[i].getParameterCount();
            apply(mimeList, methods[i], getParameterArray(parameterCount));

        }
    }


    private static String[] getParameterArray(int parameterCount) {
        String[] args = new String[parameterCount];
        for (int i = 0; i < parameterCount; i++) {
            args[i] = (i+1) + "kilometers";
        }
        return args;
    }

}
