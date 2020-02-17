package chapter_pattern.agent.dynamic;

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
        Subject bookSubject = new BookSubject();
//        InvocationHandler handler = new SubjectDynamic(bookSubject);
        Subject subject = (Subject) Proxy.newProxyInstance(bookSubject.getClass().getClassLoader(),
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
        subject.writeString("wislie");
        System.out.println("result:" + subject.readString());
    }
}
