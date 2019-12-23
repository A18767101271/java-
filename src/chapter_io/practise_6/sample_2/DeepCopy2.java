package chapter_io.practise_6.sample_2;

import java.io.*;

/**
 * 深度克隆 实现Serializable
 * Created by wislie on 2019/7/28.
 */
public class DeepCopy2 implements Serializable {

    private static final long serialVersionUID = 369285298572961L;  //最好是显式声明ID
    private int len;
    private Inner inner;

    public DeepCopy2(int len, Inner inner) {
        this.len = len;
        this.inner = inner;
    }

    static class Inner implements Serializable {

        private static final long serialVersionUID = 369285298572941L;  //最好是显式声明ID

        private String color;
        private int alpha;

        public Inner(String color, int alpha) {
            this.color = color;
            this.alpha = alpha;
        }

        @Override
        public String toString() {
            return "Inner{" +
                    "color='" + color + '\'' +
                    ", alpha=" + alpha +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "DeepCopy2{" +
                "len=" + len +
                ", inner=" + inner +
                '}';
    }

    private DeepCopy2 deepClone() {
        DeepCopy2 data = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(this);
            //将流序列化成对象
            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bais);
            data = (DeepCopy2) ois.readObject();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return data;
    }

    public static void main(String[] args) {
        DeepCopy2 sample = new DeepCopy2(10, new Inner("blue", 255));
        DeepCopy2 copySample = sample.deepClone();

        System.out.println("sample==copySample:" + (sample == copySample)); //false
        System.out.println("sample:" + sample); //DeepCopy2{len=10, inner=Inner{color='blue', alpha=255}}
        System.out.println("copySample:" + copySample); //DeepCopy2{len=10, inner=Inner{color='blue', alpha=255}}
    }
}
