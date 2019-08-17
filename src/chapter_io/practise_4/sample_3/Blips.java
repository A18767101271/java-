package chapter_io.practise_4.sample_3;

import chapter_io.FileUtil;

import java.io.*;

/**
 *
 * Created by wislie on 2018/12/13.
 */
public class Blips {

    public static void main(String[] args) {

       File file =  FileUtil.createNewFile("./src/test.txt");
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
            oos.writeObject(new Blip());
            oos.close();

            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file));
            Blip bip = (Blip) ois.readObject();
            //blip writeExternal
            //blip readExternal
            //or
            //blip writeExternal
            //java.io.InvalidClassException: chapter_io.practise_4.sample_3.Blip; no valid constructor

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
