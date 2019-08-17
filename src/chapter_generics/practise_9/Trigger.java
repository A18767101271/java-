package chapter_generics.practise_9;

import chapter_rtti.Pet;
import chapter_rtti.PetCreator;

/**
 * Created by wislie on 2018/11/8.
 */
public class Trigger<T extends PetCreator> {

    private T trigger;
    Trigger(T trigger){
        this.trigger = trigger;
    }

    Pet display(){
        return trigger.randomPet(); //为trigger设置了边界 extends PetCreator
    }
}
