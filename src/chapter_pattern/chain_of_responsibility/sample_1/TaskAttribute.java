package chapter_pattern.chain_of_responsibility.sample_1;

import java.util.Random;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/27 4:17 下午
 * desc   : 任务属性
 * version: 1.0
 */
public class TaskAttribute {

    //形状
    private String[] shapes = {"circle", "oval", "rect"};
    //尺寸
    private int[] dimens = {20, 30, 40};
    //颜色
    private String[] colors = {"red", "blue"};
    //透明度
    private float[] alpha = {0.3f, 0.8f};

    private int index;

    public TaskAttribute() {
        Random rd = new Random();
        index = rd.nextInt(shapes.length);
    }

    public String getShape() {
        if (index >= shapes.length) return null;
        return shapes[index];
    }

    public int size() {
        if (index >= dimens.length) return 0;
        return dimens[index];
    }

    public String getColor() {
        if (index >= colors.length) return null;
        return colors[index];
    }

    public float alpha() {
        if (index >= alpha.length) return 0;
        return alpha[index];
    }
}
