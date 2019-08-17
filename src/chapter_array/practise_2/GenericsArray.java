package chapter_array.practise_2;

import chapter_rtti.Pet;

/**
 * Created by wislie on 2018/7/29.
 */
public class GenericsArray {

    public static void main(String[] args){
        //擦除会移除参数类型信息
//        Pet<Pet>[] pets = new Pet<Pet>[10]; //compile error
        Peel<Pet> petPeel = new Peel<>();
        Pet[] pets = new Pet[5];
        petPeel.getArgs(pets);

        Peel.getArgs2(pets);
    }
}
