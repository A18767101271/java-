package chapter_io.practise_2.sample_2;

import chapter_io.FileUtil;
import chapter_io.practise_1.sample_2.Directory;

import java.io.*;

/**
 * Created by wislie on 2018/12/9.
 */
public class Redirecting {

    public static void main(String[] args) throws Exception {

        String path = Directory.getCurrentDirectory(Redirecting.class)
                + File.separator + "Redirecting.java";

        BufferedInputStream in = new BufferedInputStream(
                new FileInputStream(path));

        //创建文件
        File file = FileUtil.createNewFile("./src/writer.txt");
        PrintStream out = new PrintStream(new BufferedOutputStream(
                new FileOutputStream(file)));
        System.setOut(out); //将输出定向到out
        System.setErr(out);
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        String s;
        while ((s = br.readLine()) != null) {
            System.out.println(s); //这个是关键
        }
        out.close();
    }
}
