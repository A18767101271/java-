package chapter_io.practise_2.sample_1;

import chapter_io.FileUtil;

import java.io.*;

/**
 * Created by wislie on 2018/12/9.
 */
public class BufferedOutputFile {

    public static void main(String[] args) {

        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        BufferedOutputStream bos = null;
        try {
            bos = new BufferedOutputStream(new FileOutputStream(file));

            byte[] bytes = new byte[1024 * 10];
            String start = "wislie";
            byte[] startBytes = start.getBytes("UTF-8");
            System.arraycopy(startBytes, 0, bytes, 0, startBytes.length);

            String end = "zhixingli";
            byte[] endBytes = end.getBytes("UTF-8");
            System.arraycopy(endBytes, 0, bytes, bytes.length - endBytes.length, endBytes.length);

            bos.write(bytes,0, bytes.length);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
