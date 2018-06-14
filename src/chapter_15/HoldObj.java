package chapter_15;

import chapter_14.LiteralPetCreator;
import chapter_14.Pet;

public class HoldObj {

    static class Holder<T>{
        private T port;
        public Holder(T port){
            this.port = port;
        }

        public void set(T port){
            this.port = port;
        }

        public T get(){
            return port;
        }
    }
    public static void main(String[] args){
        //可以持有某个基类，也可以持有导出类型
        LiteralPetCreator literalPetCreator = new LiteralPetCreator();
        Pet pet = literalPetCreator.randomPet();
        Holder<Pet> petHolder = new Holder<>(pet);
        System.out.println(" pet:"+petHolder.get().toString());
    }
}
