package chapter_generics.practise_8;

import java.util.EnumSet;
import java.util.Set;

/**
 * Created by wislie on 2018/11/8.
 */
public class ColorSets {

    public static void main(String[] args) {

        Set<WaterColor> set1 = EnumSet.range(WaterColor.RED, WaterColor.DARD_RED);
        Set<WaterColor> set2 = EnumSet.range(WaterColor.DARD_RED, WaterColor.DARD_BLUE);

        System.out.println(Sets.union(set1, set2));//并集
        //[BLUE, DARD_RED, DARD_BLUE, LIGHT_RED, RED, LIGHT_BLUE]
        System.out.println(Sets.intersection(set1, set2));//交集
        //[DARD_RED]
        System.out.println(Sets.difference(set1, set2));//差集(相对补集)
        //[LIGHT_RED, RED]
        System.out.println(Sets.complement(set1, set2));  //补集
        //[BLUE, DARD_BLUE, LIGHT_RED, RED, LIGHT_BLUE]
    }
}
