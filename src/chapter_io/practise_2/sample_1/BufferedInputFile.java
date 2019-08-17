package chapter_io.practise_2.sample_1;

import chapter_io.FileUtil;

import java.io.*;

/**
 * Created by wislie on 2018/12/7.
 */
public class BufferedInputFile {

    public static void main(String[] args) {
        System.out.println(read());
    }

    public static String read() {
        StringBuffer sBuffer = new StringBuffer();
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        InputStreamReader isr;
        BufferedReader bufferedReader = null;
        try {
            isr = new InputStreamReader(new FileInputStream(file));
            bufferedReader = new BufferedReader(isr);
            String line = "";
            while ((line = bufferedReader.readLine()) != null) {
                sBuffer.append(line).append("\n");
            }
        } catch (FileNotFoundException e) {
            return sBuffer.toString();
        } catch (IOException e) {
            return sBuffer.toString();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return sBuffer.toString();
    }
}
