package chapter_generics;

public class BasicGenerator<T> implements Generator<T> {

    private Class<T> generator;

    public BasicGenerator(Class<T> generator){
        this.generator = generator;
    }
    @Override
    public T next() {
        try {
            return generator.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T> Generator<T> create(Class<T> generator){
        return new BasicGenerator(generator);
    }

    public static void main(String[] args) {

            Generator<CountObject> generator =  BasicGenerator.create(CountObject.class);

        for(int i =0; i < 3; i++) {
            System.out.println(generator.next());
        }

    }
}
