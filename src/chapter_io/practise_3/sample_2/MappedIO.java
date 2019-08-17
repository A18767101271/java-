package chapter_io.practise_3.sample_2;

import chapter_io.FileUtil;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.CharBuffer;
import java.nio.IntBuffer;
import java.nio.channels.FileChannel;

/**
 *
 * Created by wislie on 2018/12/10.
 */
public class MappedIO {

    public static void main(String[] args) {
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        try {
            FileChannel fc = new RandomAccessFile(file, "rw").getChannel();
            CharBuffer ib = fc.map(FileChannel.MapMode.READ_WRITE,
                    0, fc.size()).asCharBuffer();
            for (int i = 0; i < 1024; i++) { //数字过大会有问题，取的比较小
                System.out.println(ib.get(i));

            }
            fc.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
