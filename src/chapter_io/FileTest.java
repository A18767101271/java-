package chapter_io;

import java.io.File;

/**
 * Created by wislie on 2019/11/25.
 */
public class FileTest {

    public static void main(String[] args) {
        String fileName = "flower.jpg";
        String filePath = "/Users/wislie/Downloads/java" + File.separator + fileName;
        File file = new File(filePath);

        System.out.println("file exsit:"+file.exists());
        System.out.println("file path:"+file.getPath());

    }
}
