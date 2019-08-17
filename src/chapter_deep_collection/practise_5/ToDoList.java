package chapter_deep_collection.practise_5;

import chapter_deep_collection.practise_2.sample_4.Countries;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.PriorityQueue;

/**
 * 优先级队列
 * Created by wislie on 2018/11/29.
 */
public class ToDoList extends PriorityQueue<ToDoList.ToDoItem> {

    static class ToDoItem implements Comparable<ToDoItem> {

        private String first;
        private String second;
        private String name;

        ToDoItem(String first, String second, String name) {
            this.first = first;
            this.second = second;
            this.name = name;
        }

        @Override
        public int compareTo(@NotNull ToDoItem o) {
            if (first.compareTo(o.first) > 0) return 1;
            else if (first.compareTo(o.first) == 0) {
                if (second.compareTo(o.second) > 0) return 1;
                else if (second.compareTo(o.second) == 0) return 0;
            }
            return -1;
        }

        @Override
        public String toString() {
            return first + "-" + second + "-" + name;
        }
    }

    public void add(String first, String second, String name) {
        super.add(new ToDoItem(first, second, name));
    }

    public static void main(String[] args) {
        ToDoList toDoList = new ToDoList();
        List<String> nameList = Countries.names(6);
        toDoList.add("C1", "d1", nameList.get(0));
        toDoList.add("A2", "d2", nameList.get(1));
        toDoList.add("B2", "d3", nameList.get(2));
        toDoList.add("C1", "d4", nameList.get(3));
        toDoList.add("C2", "d5", nameList.get(4));
        toDoList.add("B1", "d6", nameList.get(5));
        while(!toDoList.isEmpty()){
            System.out.println(toDoList.remove());   //针对 remove排序的
        }
        //        A2-d2-ANGOLA
        //        B1-d6-BURUNDI
        //        B2-d3-BENIN
        //        C1-d1-ALGERIA
        //        C1-d4-BOTSWANA
        //        C2-d5-BURKINA FASO
    }
}
