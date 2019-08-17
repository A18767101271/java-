package chapter_interface.sample_1;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * 证明接口内所有方法都自动是public的
 * 所有域是public static final修饰的
 * Created by wislie on 2018/10/29.
 */
public class InterfaceMethodReflect {
    public static void main(String[] args) {

        try {
            Class<?> cls = Class.forName("chapter_interface.sample_1.Shape");
            Method[] methods = cls.getDeclaredMethods();
            if(methods != null){
                for(Method method : methods){
                    System.out.println("method name:"+method.toString());
                }
            }

            Field[] fields = cls.getFields();
            if(fields != null){
                for(Field field : fields){
                    System.out.println("field name:"+field.toString());
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

}
