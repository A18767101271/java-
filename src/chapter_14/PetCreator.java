package chapter_14;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public abstract class PetCreator {
    private Random rand = new Random(50);

    public abstract List<Class<? extends Pet>> types();
    public Pet randomPet(){ //获取随机的pet对象
        int n = rand.nextInt(types().size());
        try {
            return types().get(n).newInstance();
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public Pet[] createPetArray(int size){ //创建Pet数组
        Pet[] pets = new Pet[size];
        for (int i = 0; i < size; i++){
            pets[i] = randomPet();
        }
        return pets;
    }

    public List<Pet> createPetList(int size){ //创建Pet列表
        List<Pet> petsList = new ArrayList<>();
        for (int i = 0; i < size; i++){
            petsList.add(randomPet());
        }
        return petsList;
    }
}
