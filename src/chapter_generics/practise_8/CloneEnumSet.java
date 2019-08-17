package chapter_generics.practise_8;

import java.util.LinkedHashSet;
import java.util.Set;

//
public class CloneEnumSet {
    public static void main(String[] args) {

        Set<String> sets = new LinkedHashSet<>();
        sets.add("one");
        Set<String> cloneSets = (Set<String>) ((LinkedHashSet<String>) sets).clone();
        sets.add("two");
        System.out.println("sets:"+sets+" cloneSets:"+cloneSets);//sets:[one, two] cloneSets:[one]
    }
}
