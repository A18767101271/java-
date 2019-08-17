package chapter_io.practise_3.sample_1;

import chapter_io.FileUtil;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

/**
 * Created by wislie on 2018/12/9.
 */
public class GetChannel {

    public static void main(String[] args) {

        String path = "./src/writer.txt";
        //创建文件
        File file = FileUtil.createNewFile(path);
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            FileChannel fileChannel = fos.getChannel();
            fileChannel.write(ByteBuffer.wrap("just last dance".getBytes()));
            fileChannel.close();

            RandomAccessFile raf = new RandomAccessFile(file,"rw");
            fileChannel = raf.getChannel();
            fileChannel.write(ByteBuffer.wrap("dream it possible".getBytes()));
            fileChannel.close();

            FileInputStream fis = new FileInputStream(file);
            fileChannel = fis.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
            fileChannel.read(byteBuffer);
            byteBuffer.flip();

            while(byteBuffer.hasRemaining()){
                System.out.println((char) byteBuffer.get());
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {

                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
