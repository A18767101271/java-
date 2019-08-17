package chapter_internal.sample_1;

import chapter_internal.Selector;

/**
 * 迭代器设计模式
 * Created by wislie on 2018/10/29.
 */
public class Sequence {

    private String[] items;

    private Sequence(int count) {
        items = new String[count];
    }

    private void add(String item, int index) {
        if (items == null) return;
        if (index >= items.length) return;
        items[index] = item;
    }


    private Selector getSelector() {
        return new SequenceSelector();
    }

    private class SequenceSelector implements Selector {

        int index = 0;

        @Override
        public Object next() {
            return items[index++];
        }

        @Override
        public boolean hasNext() {
            return index < items.length;
        }

    }

    public static void main(String[] args) {

        int count = 10;
        Sequence sequence = new Sequence(count);
        for (int i = 0; i < count; i++) {
            sequence.add("item-" + i, i);
        }

        Selector selector = sequence.getSelector();
        while (selector.hasNext()) {
            System.out.print(selector.next() + " ");
        }

    }

}
