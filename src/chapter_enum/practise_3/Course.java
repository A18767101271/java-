package chapter_enum.practise_3;

import java.util.Random;

/**
 * 枚举嵌套枚举
 * Created by wislie on 2019/5/8.
 */
public enum Course {

    FRUIT(Food.Fruit.class), MEAT(Food.Meat.class), VEGETABLE(Food.Vegetable.class);

    private Food[] values;
    private Random rd = new Random();
    Course(Class<? extends Food> kind) {
        values = kind.getEnumConstants();
    }

    interface Food {

        enum Fruit implements Food {
            APPLE, ORANGE, BANANA, PEAR;
        }

        enum Meat implements Food {
            PORK, BEEF, MUTTON, CHICKEN;
        }

        enum Vegetable implements Food {
            POTATO, TOMATO, PUMPKIN, TURNIP;
        }
    }

    private Food random(){
        return values[rd.nextInt(values.length)];
    }

    public static void main(String[] args) {
        Course[] courses = Course.values();
        for(int i = 0; i < 3; i++){
            for(Course course : courses){
                Food food = course.random();
                System.out.println(food);
            }
            System.out.println("---------------");
        }
    }
}
/**
 * BANANA
 * BEEF
 * PUMPKIN
 *---------------
 * BANANA
 * MUTTON
 * PUMPKIN
 *---------------
 * APPLE
 * CHICKEN
 * TOMATO
 *
 */
