package chapter_string.sample_6;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.Scanner;

/**
 * Created by wislie on 2018/11/6.
 */
public class ScannerReader {

    public static void main(String[] args) {

        BufferedReader br = new BufferedReader(new StringReader("wislie is diligent\n" +
                "he probably be able to go to a good company"));
        Scanner scanner = new Scanner(br);
        while (scanner.hasNext()) {
            System.out.println(scanner.nextLine());
        }
        //wislie is diligent
        //he probably be able to go to a good company
    }
}
