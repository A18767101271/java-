package chapter_io.practise_2.sample_1;

import chapter_io.FileUtil;

import java.io.*;

/**
 * Created by wislie on 2018/12/9.
 */
public class PrintStreamFile {

    public static void main(String[] args) {

        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        File dest = FileUtil.createNewFile("./src/writer.txt");
        BufferedReader br = null;
        PrintWriter pw = null;
        try {
            pw = new PrintWriter(new FileWriter(dest));
            br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
            String readLine;
            while((readLine = br.readLine() )!= null){
                pw.println(readLine);
            }
            pw.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
