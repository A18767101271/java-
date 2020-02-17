package chapter_pattern.agent.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/1/29 4:43 下午
 * desc   : 动态代理InvocationHandler
 * version: 1.0
 */
public class SubjectDynamic implements InvocationHandler {

    private Object proxied;

    public SubjectDynamic(Object proxied) {
        this.proxied = proxied;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) {
        Object obj = null;
        try {
            if (proxied != null) {
                obj = method.invoke(proxied, args);
            }
            //无效的
            /*if (proxy != null) {
                obj = method.invoke(proxy, args);
            }*/
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } finally {
            return obj;
        }

    }
}
