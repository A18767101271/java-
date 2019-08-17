package chapter_generics.practise_9;

import chapter_generics.practise_5.Generator;
import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.ArrayList;

/**
 * 擦除
 */
public class GenericsClear {
    public static void main(String[] args) {

        clear();

        display();
        Derived2 d2 = new Derived2();
        Object obj = d2.getData();
        //参数类型擦除 T 会被认为是Object
        d2.setData(obj);
    }


    private static void clear() {
        Class cls1 = new ArrayList<Integer>().getClass();
        Class cls2 = new ArrayList<String>().getClass();
        System.out.println("cls1 == cls2 ? " + (cls1 == cls2)); //cls1 == cls2 ? true
    }


    private static void display() {
        Trigger trigger = new Trigger<>(new LiteralPetCreator());
        Pet pet = trigger.display();
        System.out.println(pet);//Mutt
    }
}


//编译不通过, 编译器期望得到一个原生基类
    /*class Derived3 extends Generics<?>{

    }*/
