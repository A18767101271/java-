package chapter_generics.practise_11;

import chapter_rtti.sample_4.Factory;
import chapter_rtti.sample_4.Filter;

/**
 * Created by wislie on 2018/11/8.
 */
public class FactoryConstraint {

    static class Foo<T>{
        private T x;
        public <F extends Factory<T>> Foo(F factory){
            x = factory.create();
        }
    }

    public static void main(String[] args) {

        new Foo<>(new Filter.Factory());
    }
}
