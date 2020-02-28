package chapter_pattern.chain_of_responsibility.sample_1;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:05 下午
 * desc   : 设置desk的属性
 * version: 1.0
 */
public class Desk {

    /**
     * 颜色
     */
    private String color;

    /**
     * 透明度
     */
    private float alpha;

    /**
     * 形状
     */
    private String shape;

    /**
     * 尺寸
     */
    private int size;

    public Desk setColor(String color) {
        this.color = color;
        return this;
    }

    public Desk setAlpha(float alpha) {
        this.alpha = alpha;
        return this;
    }

    public Desk setShape(String shape) {
        this.shape = shape;
        return this;
    }

    public Desk setSize(int size) {
        this.size = size;
        return this;
    }

    public String getColor() {
        return color;
    }

    public float getAlpha() {
        return alpha;
    }

    public String getShape() {
        return shape;
    }

    public int getSize() {
        return size;
    }

    @Override
    public String toString() {
        return "Desk{" +
                "color='" + color + '\'' +
                ", alpha=" + alpha +
                ", shape='" + shape + '\'' +
                ", size=" + size +
                '}';
    }
}
