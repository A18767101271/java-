package chapter_generics.practise_8;

import java.util.LinkedHashSet;
import java.util.Set;

//练习17
public class CloneEnumSet {
    public static void main(String[] args) {

        Set<String> sets = new LinkedHashSet<>();
        sets.add("one");
        Set<String> cloneSets = (Set<String>) ((LinkedHashSet<String>) sets).clone();
        sets.add("two");
        System.out.println("cloneSets:"+cloneSets);
    }
}
