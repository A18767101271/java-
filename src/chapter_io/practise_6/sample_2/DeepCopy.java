package chapter_io.practise_6.sample_2;

import chapter_io.practise_6.sample_1.ShallowCopy;

/**
 * 深度拷贝 实现Cloneable
 * Created by wislie on 2019/7/28.
 */
public class DeepCopy implements Cloneable {

    private String value;
    private ShallowCopy shaderCopy;

    public DeepCopy(String value, ShallowCopy shaderCopy) {
        this.value = value;
        this.shaderCopy = shaderCopy;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public ShallowCopy getShaderCopy() {
        return shaderCopy;
    }

    public void setShaderCopy(ShallowCopy shaderCopy) {
        this.shaderCopy = shaderCopy;
    }

    @Override
    protected Object clone() {
        DeepCopy d = null;
        try {
            d = (DeepCopy) super.clone();
            d.setShaderCopy((ShallowCopy) shaderCopy.clone());
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return d;
    }

    @Override
    public String toString() {
        return "{" +
                "value='" + value + '\'' +
                ", shaderCopy=" + shaderCopy +
                '}';
    }

    public static void main(String[] args) {
        DeepCopy sample = new DeepCopy("high", new ShallowCopy(12, "wislie"));
        DeepCopy cloneObj = (DeepCopy) sample.clone();
        System.out.println("深度拷贝 (cloneObj == sample):" + (cloneObj == sample));
        System.out.println("sample:" + sample);
        System.out.println("cloneObj:" + cloneObj);
    }
}
