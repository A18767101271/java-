package chapter_annotation.sample_1;


import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by wislie on 2019/6/23.
 */
public class Test {

    public static void main(String[] args) {
        try {
            Class cls = Class.forName("chapter_annotation.sample_1.Child");

            Field field = cls.getDeclaredField("item");
            boolean isFieldAnnotationPresent = field.isAnnotationPresent(Description.class);
            Description fieldAnnotation = field.getAnnotation(Description.class);
            System.out.println("isFieldAnnotationPresent:" + isFieldAnnotationPresent + " age:" + fieldAnnotation.age());//true

            Method method = cls.getDeclaredMethod("setItem", String.class);
            boolean isMethodAnnotationPresent = method.isAnnotationPresent(Description.class);
            Description methodAnnotation = method.getAnnotation(Description.class);
            System.out.println("isMethodAnnotationPresent:" + isMethodAnnotationPresent + " name:" + methodAnnotation.name());//true

            boolean isClassAnnotationPresent = cls.isAnnotationPresent(Description.class);
            System.out.println("isClassAnnotationPresent:" + isClassAnnotationPresent); //true

            Annotation[] annotations = cls.getAnnotations();
            System.out.println("annotations len:" + annotations.length);
            for (Annotation annotation : annotations) {
                System.out.println("注解名称:" + annotation.annotationType().getName());
            }

            Child child = (Child) cls.newInstance();
            Method[] methods = cls.getDeclaredMethods();
            for (int i = 0; i < methods.length; i++) {
                Method m = methods[i];
                int parameterCount = m.getParameterCount();
                System.out.println("方法名称:"+m.getName()+" 参数数量:"+parameterCount);
                if(parameterCount == 0){
                    m.invoke(child, null);
                }else if(parameterCount == 1){
                    m.invoke(child, "值");
                }
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
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
}
