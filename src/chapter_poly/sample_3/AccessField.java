package chapter_poly.sample_3;

import chapter_poly.BaseCycle;
import chapter_poly.Bicycle;

/**
 * 任何域访问由编译器解析
 * Created by wislie on 2018/10/26.
 */
public class AccessField {

    public static void main(String[] args){
        BaseCycle cycle = new Bicycle();
        System.out.println("field model:"+cycle.model +" method model:"+cycle.getModel()); //field model:0 method model:5
    }
}
