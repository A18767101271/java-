package chapter_collection.sample_2;

import chapter_internal.Selector;

import java.util.ArrayList;
import java.util.List;

/**
 * 迭代器设计模式
 * Created by wislie on 2018/10/29.
 */
public class Sequence {

    private List<String> items;

    private Sequence() {
        items = new ArrayList<>();
    }

    private void add(String item) {
        if (items == null) return;
        items.add( item);
    }


    private Selector getSelector() {
        return new SequenceSelector();
    }

    private class SequenceSelector implements Selector {

        int index = 0;

        @Override
        public Object next() {
            return items.get(index++);
        }

        @Override
        public boolean hasNext() {
            return index < items.size();
        }

    }

    public static void main(String[] args) {

        int count = 10;
        Sequence sequence = new Sequence();
        for (int i = 0; i < count; i++) {
            sequence.add("item-" + i);
        }

        Selector selector = sequence.getSelector();
        while (selector.hasNext()) {
            System.out.print(selector.next() + " ");
        }

    }

}
