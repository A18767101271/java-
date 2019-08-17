package chapter_io.practise_4.sample_2;

import chapter_io.FileUtil;

import java.io.*;

/**
 * 序列化流
 * Created by wislie on 2018/12/11.
 */
public class ObjectStream {


    public static void main(String[] args) {

        File file = FileUtil.createNewFile("./src/test.txt");
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
            oos.writeObject(new Ant("wislie", 100));
            oos.close();

            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));
            Ant ant = (Ant) ois.readObject();
            System.out.println(ant);//name:wislie size:100

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos2 = new ObjectOutputStream(baos);
            oos2.writeObject(new Ant("bill", 105));
            oos2.close();

            ObjectInputStream ois2 = new ObjectInputStream(new ByteArrayInputStream(baos.toByteArray()));
            Ant ant2 = (Ant) ois2.readObject();
            System.out.println(ant2);//name:bill size:105
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

}
