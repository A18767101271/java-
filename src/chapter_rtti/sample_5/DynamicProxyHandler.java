package chapter_rtti.sample_5;

import com.sun.deploy.net.proxy.ProxyHandler;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * 动态代理
 * Created by wislie on 2018/11/7.
 */
public class DynamicProxyHandler implements InvocationHandler {

    private Object proxied;

    public DynamicProxyHandler(Object proxied) {
        this.proxied = proxied;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if(args != null){
            System.out.println(proxy +"-"+method+"-"+args);
        }
        return method.invoke(proxied, args);
    }
}
