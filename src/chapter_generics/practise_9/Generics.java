package chapter_generics.practise_9;

/**
 * Created by wislie on 2018/11/8.
 */
class Generics<T> {
    private T data;

    public void setData(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }
}
