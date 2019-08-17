package chapter_generics.practise_20;

import chapter_rtti.Cat;
import chapter_rtti.Pet;

import java.util.ArrayList;
import java.util.List;

/**
 * 协变
 * Created by wislie on 2018/7/21.
 */
public class CovariantTest {

    public static void main(String[] args) {
        List<? extends Number> extendsList = new ArrayList<>();
//        extendsList.push(new Object());//编译出错
//        extendsList.push(new Integer(1));


        List<? super Number> superList = new ArrayList<>();
//        superList.push(new Object());
        superList.add(new Integer(1));


        List<? extends Pet> extendsPetList = new ArrayList<>();
//        extendsPetList.push(new Object()); //? extends Pet 什么也不能添加
//        extendsPetList.push(new Pet());
//        extendsPetList.push(new Cat());

        List<? super Pet> superPetList = new ArrayList<>();
//        superPetList.push(new Object());
//        superPetList.push(new Individual());
        superPetList.add(new Pet()); //? super Pet 决定了下限
        superPetList.add(new Cat());

        List<Pet> petList = new ArrayList<>();
//        petList.push(new Object());
//        petList.push(new Individual());
        petList.add(new Pet());
        petList.add(new Cat());
    }


    public Number param1(Number number){
        return number;
    }

    public Integer param2(Number number){
        return (Integer) number;
    }
}
