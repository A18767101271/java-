package chapter_deep_collection.practise_1.sample_2;

/**
 * Created by wislie on 2018/11/22.
 */
public class Element {

    private String ident;

    public Element(String id) {
        this.ident = id;
    }

    @Override
    public String toString() {
        return ident;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof Element &&
                ident.equals(((Element) obj).ident);
    }

    @Override
    public int hashCode() {
        return ident.hashCode();
    }

    protected void finalize() {
        System.out.println("Finalizing " +
                getClass().getSimpleName() +
                " " + ident);
    }
}
