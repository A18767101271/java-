package chapter_poly.sample_3;

import chapter_poly.BaseCycle;
import chapter_poly.Bicycle;

/**
 * 任何静态方法访问由编译器解析
 * Created by wislie on 2018/10/26.
 */
public class AccessStaticMethod {
    public static void main(String[] args){
        BaseCycle cycle = new Bicycle();
        cycle.invokeStaticMethod();//BaseCycle invokeStaticMethod
    }
}
