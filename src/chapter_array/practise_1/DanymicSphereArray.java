package chapter_array.practise_1;

import chapter_generics.practise_5.CountObject;

/**
 *
 * Created by wislie on 2018/7/28.
 */
public class DanymicSphereArray {

    public static void main(String[] args){
//        sphereArray({new Sphere(), new Sphere()}); //编译出错 作为实参,聚集初始化数组不能奏效
        CountObject[] arr = {new CountObject(), new CountObject(), new CountObject()};
        sphereArray(arr);
    }

    private static void sphereArray(CountObject[] arr){
        if(arr == null) return;
        for(CountObject sphere : arr){
            System.out.println(sphere);
        }
    }
}
