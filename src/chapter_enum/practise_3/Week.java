package chapter_enum.practise_3;

import java.util.Collection;
import java.util.EnumSet;
import java.util.HashSet;

/**
 * EnumSet的使用
 * Created by wislie on 2019/5/9.
 */
public enum Week {

    MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY;

    public static void main(String[] args) {

        //全部枚举值
        EnumSet week = EnumSet.allOf(Week.class); //[MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
        //创建EnumSet空集合,指定其集合元素是指定枚举类的枚举值
        EnumSet noneOfWeek = EnumSet.noneOf(Week.class);//[]
        //为指定枚举值创建EnumSet集合
        EnumSet partWeek = EnumSet.of(MONDAY, TUESDAY);//[MONDAY, TUESDAY]
        partWeek.add(WEDNESDAY);
        Collection collection = new HashSet();
        collection.add(SATURDAY);
        collection.add(SUNDAY);
        partWeek.addAll(collection);
        //将partWeek的枚举值复制到新的EnumSet集合
        EnumSet copyOfWeek = EnumSet.copyOf(partWeek);//[MONDAY, TUESDAY, WEDNESDAY]
        //为指定枚举值创建EnumSet集合，包含了copyOfWeek在全部枚举常量中的补集
        EnumSet complementOfWeek = EnumSet.complementOf(copyOfWeek);//[THURSDAY, FRIDAY, SATURDAY, SUNDAY]
        //指定枚举值创建EnumSet集合，包含了两个枚举常量的并集
        EnumSet rangeWeek = EnumSet.range(THURSDAY,FRIDAY);//[THURSDAY, FRIDAY]
        System.out.println("rangeWeek:"+rangeWeek);
        week.removeAll(rangeWeek); //[MONDAY, TUESDAY, WEDNESDAY, SATURDAY, SUNDAY]
        week.remove(WEDNESDAY);//[MONDAY, TUESDAY, SATURDAY, SUNDAY]
        week.add(THURSDAY);
    }
}
