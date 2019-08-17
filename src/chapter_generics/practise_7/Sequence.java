package chapter_generics.practise_7;

/**
 * 泛化Sequence
 * Created by wislie on 2018/6/17.
 */
public class Sequence<T> {

    private T[] items;
    private int next;

    public Sequence(int size) {
        items = (T[])new Object[size]; //创建泛型数组
    }

    public void add(T value) {
        if (next < items.length) {
            items[next++] = value;
        }
    }

    interface Selector<T> {

        boolean end();

        T current();

        void next();
    }

    public Selector selector(){
        return new SequenceSelector();
    }

    private  class SequenceSelector implements Selector<T> {
        int i = 0;
        @Override
        public boolean end() {
            return i == items.length;
        }

        @Override
        public T current() {
            return items[i];
        }

        @Override
        public void next() {
            if(i < items.length){
                i++;
            }
        }
    }

    public static void main(String[] args) {
        Sequence sequence = new Sequence(10);
        Selector selector = sequence.selector();
        for(int i = 0; i < sequence.items.length; i++){
            sequence.add("data-"+i);
//            sequence.push(new Object());
        }

        while (!selector.end()){
            String current = (String) selector.current();
            System.out.println(current);
            selector.next();
        }

    }
}
