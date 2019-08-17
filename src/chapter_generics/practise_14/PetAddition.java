package chapter_generics.practise_14;

import chapter_rtti.Cat;
import chapter_rtti.Pet;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wislie on 2018/11/23.
 */
public class PetAddition<T extends Pet> {

    private List<? super Pet> pets = new ArrayList<>();
    public void add(T pet){
        pets.add(pet);
    }

    public T get(){
        return (T) pets.get(0); //转型了
    }

    public static void main(String[] args){
        PetAddition<Pet> petAddition = new PetAddition();
        petAddition.add(new Cat());

        petAddition.get();

    }
}
