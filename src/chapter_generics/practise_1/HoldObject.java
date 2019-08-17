package chapter_generics.practise_1;

import chapter_rtti.Dog;
import chapter_rtti.LiteralPetCreator;
import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

import java.util.ArrayList;
import java.util.List;

public class HoldObject {

    private static <T> void print(Holder<T> holder){
        T t = holder.get();
        System.out.println("持有对象的类型: "+t.getClass().getSimpleName());
    }

    public static void main(String[] args) {

        Holder<Integer> integerHolder = new Holder(3);
        print(integerHolder);

        Holder<String> stringHolder = new Holder("wislie");
        print(stringHolder);

        Holder<Double> doubleHolder = new Holder(1.08);
        print(doubleHolder);

        //可以持有某个基类，也可以持有导出类型
        PetCreator literalPetCreator = new LiteralPetCreator();
        Pet pet = literalPetCreator.randomPet();
        Holder<Pet> petHolder = new Holder<>(pet);
        System.out.println("pet:"+petHolder.get().toString());

        Pet dog = creator.randomPet();
        if(dog instanceof Dog){
            Holder<Dog> dogHolder = new Holder<>((Dog) dog);
            System.out.println("dogHolder:"+dogHolder.get().toString());
        }
    }

    static LiteralPetCreator creator = new LiteralPetCreator(){

        @Override
        public List<Class<? extends Pet>> types() {
            List<Class<? extends Pet>> dogTypes = new ArrayList<>();
            dogTypes.add(Dog.class);
            return dogTypes;
        }
    };
}
