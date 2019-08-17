package chapter_io.practise_3.sample_1;

import chapter_io.FileUtil;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * 两种方式
 * Created by wislie on 2018/12/9.
 */
public class ChannelCopy {

    public static void main(String[] args) {
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        File outFile = FileUtil.createNewFile("./src/writer.txt");
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            fis = new FileInputStream(file);
            fos = new FileOutputStream(outFile);
//            copy1(fis.getChannel(), fos.getChannel());
            copy2(fis.getChannel(), fos.getChannel());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    private static void copy1(FileChannel inChannel, FileChannel outChannel) {
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
        try {
            while (inChannel.read(byteBuffer) > 0) {
                byteBuffer.flip();
                outChannel.write(byteBuffer);
                byteBuffer.clear();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void copy2(FileChannel inChannel, FileChannel outChannel) {
        try {
            inChannel.transferTo(0, inChannel.size(), outChannel);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
