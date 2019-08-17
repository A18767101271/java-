package chapter_generics.practise_14;

import chapter_rtti.Cat;
import chapter_rtti.Manx;
import chapter_rtti.Mutt;
import chapter_rtti.Pet;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by wislie on 2018/11/8.
 */
public class CovariantArrays {

    public static void main(String[] args) {

        covariantArrays();

//        test();


//        writeTo(pets);


//        writeToSuperGenerics(pets, new Cat());

        List<Pet> pets = new ArrayList<>(Arrays.asList(new Pet()));
        Reader<Pet> petReader = new Reader<>();
        Pet pet = petReader.readExact(pets);

        List<Cat> cats = new ArrayList<>(Arrays.asList(new Cat()));
//        Pet p = petReader.readExact(cats); //compile error

        Pet pc = petReader.readGenerics(cats);

//        Reader<Cat> catReader = new Reader<>();
//        Cat cat = catReader.readExact(cats);

    }


    private static void covariantArrays() {
        Pet[] pets = new Cat[10];
        pets[0] = new Cat();
        pets[1] = new Manx();
        pets[2] = new Pet(); //java.lang.ArrayStoreException: chapter_rtti.Pet
        System.out.println(Arrays.toString(pets));
    }

   /* private static void nonCovariantGenerics(){
        List<Pet> flist = new ArrayList<Cat>(); //compile error
    }*/

   /* private static void genericsCovariance(){
        List<? extends Pet> flist = new ArrayList<Cat>();
        flist.add(new Cat()); //compile error
        flist.add(new Pet()); //compile error

        List<? extends Cat> clist = new ArrayList<Manx>();
        clist.add(new Cat());//compile error
        clist.add(new Pet());//compile error

        List<? extends Cat> list = new ArrayList<>();
        list.add(new Manx()); //compile error
    }*/


    private static void test() {

        Number[] number = new Integer[3];
        number[0] = 5;
//        number[1] = 5.5; //java.lang.ArrayStoreException: chapter_rtti.Pet

        // List<Number> numberList = new ArrayList<Integer>(); //compile error
//        List<? extends Number> numberList = new ArrayList<Integer>();
//        numberList.add(1);//compile error

        List<? extends Number> numberList = Arrays.asList(12);
        Number value = numberList.get(0);
        System.out.println(value);
    }

    private static void writeTo(List<? super Pet> pets) {
        pets.add(new Pet());
        pets.add(new Cat());
        pets.add(new Mutt());
        System.out.println(pets);//[Pet, Cat, Mutt]
    }

    private static <T> void writeToSuperGenerics(List<? super T> pets, T item) {
        pets.add(item);
    }


    static private class Reader<T> {

        T readExact(List<T> list) {
            return list.get(0);
        }

        T readGenerics(List<? extends T> list) {
            return list.get(0);
        }
    }
}
