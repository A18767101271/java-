package chapter_io.practise_6.sample_1;

/**
 * 浅度拷贝
 * Created by wislie on 2019/7/28.
 */
public class ShallowCopy implements Cloneable {

    private int age;
    private String name;

    public ShallowCopy(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public Object clone() {
        ShallowCopy s = null;
        try {
            s = (ShallowCopy) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return s;
    }

    @Override
    public String toString() {
        return "{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    public static void main(String[] args) {

        ShallowCopy sample = new ShallowCopy(1, "wislie");

        ShallowCopy cloneObj = (ShallowCopy) sample.clone();

        System.out.println("浅度拷贝 (cloneObj == sample):" + (cloneObj == sample));
        System.out.println("sample:" + sample);
        System.out.println("cloneObj:" + cloneObj);
    }
}
