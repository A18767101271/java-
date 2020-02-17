package chapter_pattern.agent.dynamic;

import kotlin.io.FilesKt;
import sun.misc.ProxyGenerator;

import java.io.File;
import java.lang.reflect.*;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/1/29 4:46 下午
 * desc   : 动态代理
 * version: 1.0
 */
public class Main {

    public static void main(String[] args) {
        BookSubject bookSubject = new BookSubject();
        //代理对象
        Proxy delegate = (Proxy) Proxy.newProxyInstance(BookSubject.class.getClassLoader(),
                bookSubject.getClass().getInterfaces(), new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) {
                        Object result = null;
                        try {
                            result = method.invoke(bookSubject, args);
                        } catch (IllegalAccessException e) {
                            e.printStackTrace();
                        } catch (InvocationTargetException e) {
                            e.printStackTrace();
                        }
                        return result;
                    }
                });

        //如果从Subject接口实现
        if (delegate instanceof Subject) {
            Subject subject = (Subject) delegate;
            subject.writeString("好好学习");
            System.out.println("subject..." + subject.readString());
        }
        //如果从Material接口实现
        if (delegate instanceof Material) {
            Material material = (Material) delegate;
            System.out.println("material..." + material.getColor());
        }
    }
}
