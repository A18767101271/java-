package chapter_collection.sample_5;

import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.*;

/**
 * 迭代器
 * Created by wislie on 2018/10/30.
 */
public class CrossContainerIteration {

    private static void display(Iterator<Pet> itr){
        while(itr.hasNext()){
            Pet pet = itr.next();
            System.out.print(pet + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        PetCreator petCreator = new LiteralPetCreator();
        List<Pet> pets = petCreator.createPetList(6);
        display(pets.iterator());

        LinkedList<Pet> petLinkedList = new LinkedList<>(pets);
        display(petLinkedList.iterator());

        Set<Pet> petHashSet = new HashSet<>(pets);
        display(petHashSet.iterator());

        Set<Pet> petTreeSet = new TreeSet<>(pets);
        display(petTreeSet.iterator());//Cat Cat Manx Mutt Mutt Pug

        Set<Pet> petLinkedHashSet = new LinkedHashSet<>(pets);
        display(petLinkedHashSet.iterator());//Mutt Manx Mutt Pug Cat Cat
    }
}
