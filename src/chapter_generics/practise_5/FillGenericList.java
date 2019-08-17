package chapter_generics.practise_5;

import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by wislie on 2018/11/8.
 */
public class FillGenericList {

    public static void main(String[] args) {
        Collection<Integer> fibonacciCollection = Generator.fill(new ArrayList<>(), new Fibonacci(), 10);
        System.out.println(fibonacciCollection);

        Collection<Pet> petCollection = Generator.fill(new ArrayList<>(), petGenerator, 5);
        System.out.println(petCollection);

        Collection<CountObject> countObjectCollection = Generator.fill(new ArrayList<>(), countObjectGenerator, 7);
        System.out.println(countObjectCollection);

        //[1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        //[Dog, Mutt, Dog, Pet, Pet]
        //[CountObject:0, CountObject:1, CountObject:2, CountObject:3, CountObject:4, CountObject:5, CountObject:6]
    }

    private static Generator<Pet> petGenerator = new Generator<Pet>() {
        @Override
        public Pet next() {
            PetCreator petCreator = new LiteralPetCreator();
            return petCreator.randomPet();
        }
    };

    private static Generator<CountObject> countObjectGenerator = new Generator<CountObject>() {
        @Override
        public CountObject next() {
            return new CountObject();
        }
    };
}
