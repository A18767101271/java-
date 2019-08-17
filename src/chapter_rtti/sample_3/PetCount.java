package chapter_rtti.sample_3;

import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.HashMap;
import java.util.List;

/**
 * 获取相对应pet的数量
 * Created by wislie on 2018/11/6.
 */
public class PetCount {

    public static void main(String[] args) {
        PetCreator petCreator = new LiteralPetCreator();
        List<Pet> pets = petCreator.createPetList(10);
        PetMap petMap = new PetMap();
        for (int i = 0; i < pets.size(); i++) {
            Pet pet = pets.get(i);
            petMap.putPet((Class<Pet>) pet.getClass());
        }
        System.out.println(petMap);//{Pug=1, Cat=2, Mutt=3, Dog=1, Pet=3}

    }

    private static class PetMap extends HashMap<String, Integer> {

        void putPet(Class<Pet> cls) {

            Integer count = get(cls.getSimpleName());
            if (count == null) {
                put(cls.getSimpleName(), 1);
            } else {
                put(cls.getSimpleName(), count + 1);
            }
        }
    }
}
