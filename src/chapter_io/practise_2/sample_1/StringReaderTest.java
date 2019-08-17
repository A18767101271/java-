package chapter_io.practise_2.sample_1;

import java.io.IOException;
import java.io.StringReader;

/**
 * Created by wislie on 2018/12/9.
 */
public class StringReaderTest {

    public static void main(String[] args) {

        String readLine = BufferedInputFile.read();
        StringReader sr = new StringReader(readLine);

        int len = 0;
        try {
            while ((len = sr.read()) != -1) {
                System.out.println((char) len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (sr != null) {
                sr.close();
            }

        }
    }
}
