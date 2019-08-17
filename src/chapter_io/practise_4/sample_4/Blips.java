package chapter_io.practise_4.sample_4;

import chapter_io.FileUtil;

import java.io.*;

/**
 * Created by wislie on 2018/12/13.
 */
public class Blips {

    public static void main(String[] args) {

        File file = FileUtil.createNewFile("./src/test.txt");
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
            oos.writeObject(new Blip("wislie", 29));
            oos.close();

            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));
            Blip blip = (Blip) ois.readObject();
            System.out.println(blip);
            //name:null age:0
            //or
            //name:wislie age:29
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
