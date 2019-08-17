package chapter_io.practise_4.sample_1;

import chapter_io.FileUtil;

import java.io.*;
import java.util.zip.*;

/**
 * Created by wislie on 2018/12/11.
 */
public class ZIPcompress {

    public static void main(String[] args) {
        File zipFile = FileUtil.createNewFile("./src/test.zip");

        BufferedOutputStream bos = null;
        ZipInputStream zipInputStream = null;
        CheckedInputStream cis = null;
        try {
            CheckedOutputStream cos = new CheckedOutputStream(new FileOutputStream(zipFile), new Adler32());
            ZipOutputStream zos = new ZipOutputStream(cos);
            bos = new BufferedOutputStream(zos);
            zos.setComment("wislie will be able to join ant");

            String path = "./src/test.txt";
            BufferedReader br = new BufferedReader(new FileReader(path));
            zos.putNextEntry(new ZipEntry(path));

            int in;
            while ((in = br.read()) != -1) {
                zos.write(in);
            }
            zos.close(); //写完一定要记得关闭，关闭之后才可以给其他流使用

            cis = new CheckedInputStream(new FileInputStream(zipFile), new Adler32());
            zipInputStream = new ZipInputStream(cis);
            BufferedInputStream bis = new BufferedInputStream(zipInputStream);
            ZipEntry zipEntry;
            while ((zipEntry = zipInputStream.getNextEntry()) != null) {

                byte[] bytes = new byte[1024];
                int len = 0;
                while ((len = bis.read(bytes)) > 0) {
                    System.out.println(new String(bytes,0, len));
                }
            }
            bis.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
//            try {

//                    System.out.println("value:" + cos.getChecksum().getValue());
//                    cos.close();

//            } catch (IOException e) {
//                e.printStackTrace();
//            }
        }
    }
}
