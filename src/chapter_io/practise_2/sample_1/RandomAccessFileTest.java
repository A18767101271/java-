package chapter_io.practise_2.sample_1;

import chapter_io.FileUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * Created by wislie on 2018/12/7.
 */
public class RandomAccessFileTest {

    public static void main(String[] args) {
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        try {
            RandomAccessFile raf = new RandomAccessFile(file,"rw");
            raf.seek(raf.length());
            raf.writeUTF("wislie 希望做到最好");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
