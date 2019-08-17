package chapter_generics.practise_13;

/**
 * Created by wislie on 2018/11/8.
 */
public class BasicBounded extends Dimension implements HasColor {

    public static void main(String[] args) {
        ColoredDimension<BasicBounded> coloredDimension = new ColoredDimension<>(new BasicBounded());
        System.out.println(coloredDimension.getColor());
        System.out.println(coloredDimension.getX());
        System.out.println(coloredDimension.getY());
        System.out.println(coloredDimension.getZ());
    }

    @Override
    public String getColor() {
        return "red";
    }
}
