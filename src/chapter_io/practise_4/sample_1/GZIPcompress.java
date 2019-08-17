package chapter_io.practise_4.sample_1;

import chapter_io.FileUtil;

import java.io.*;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * 写入和读取要对应 gzip
 * Created by wislie on 2018/12/10.
 */
public class GZIPcompress {

    public static void main(String[] args) {
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        File destFile = FileUtil.createNewFile("./src/test.gz");
        BufferedOutputStream bos = null;
        BufferedReader br = null, br2 = null;

        try {
            br = new BufferedReader(new FileReader(file));

            bos = new BufferedOutputStream(new GZIPOutputStream(new FileOutputStream(destFile)));
            int in = 0;
            while ((in = br.read()) != -1) {
                bos.write(in);
            }
            br.close();
            bos.close();
            br2 = new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream(destFile))));
            String s = "";
            while ((s = br2.readLine()) != null) {
                System.out.println(s);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bos != null) {
                    bos.close();
                }
                br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
