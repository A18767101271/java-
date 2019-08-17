package chapter_generics.practise_13;

/**
 * Created by wislie on 2018/11/8.
 */
public class ColoredDimension<T extends Dimension & HasColor> { //先类后接口

    T data;

    public ColoredDimension(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public String getColor() {
        return data.getColor();
    }

    public int getX() {
        return data.x;
    }

    public int getY() {
        return data.y;
    }

    public int getZ() {
        return data.z;
    }
}
