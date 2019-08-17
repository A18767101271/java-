package chapter_collection.sample_8;

import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.Iterator;

/**
 *
 * Created by wislie on 2018/10/30.
 */
public class NonCollectionSequence {

    private Pet[] createPets() {
        PetCreator petCreator = new LiteralPetCreator();
        Pet[] pets = petCreator.createPetArray(5);
        return pets;
    }

    private Iterator iterator(Pet[] pets) {
        return new Iterator() {
            int index;

            @Override
            public boolean hasNext() {
                return index < pets.length;
            }

            @Override
            public Object next() {
                return pets[index++];
            }
        };
    }

    private static void display(Iterator itr) {
        while (itr.hasNext()) {
            System.out.print(itr.next() + " ");
        }
    }

    public static void main(String[] args) {
        NonCollectionSequence sequence = new NonCollectionSequence();
        Iterator itr = sequence.iterator(sequence.createPets());
        display(itr);
    }
}
