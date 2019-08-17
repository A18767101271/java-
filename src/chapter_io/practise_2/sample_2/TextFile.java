package chapter_io.practise_2.sample_2;

import chapter_io.practise_1.sample_2.Directory;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.TreeSet;

/**
 * Created by wislie on 2018/12/9.
 */
public class TextFile extends ArrayList<String> {

    public TextFile(String fileName) {
        this(fileName, "\n");
    }

    public TextFile(String fileName, String splitter) {
        super(Arrays.asList(read(fileName).split(splitter)));
        if (get(0).equals("")) remove(0);
    }

    public static void write(String fileName, String text) {
        PrintWriter pw = null;
        try {
            pw = new PrintWriter(new File(fileName));
            pw.write(text);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            pw.close();
        }
    }

    public void write(String fileName) {
        PrintWriter pw = null;
        try {
            pw = new PrintWriter(new File(fileName));
            for (String item : this) {
                pw.write(item);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            pw.close();
        }
    }

    public static String read(String fileName) {
        BufferedReader br = null;
        StringBuffer stringBuffer = new StringBuffer();
        try {
            br = new BufferedReader(new FileReader(new File(fileName).getAbsoluteFile()));
            String line = "";
            while ((line = br.readLine()) != null) {
                stringBuffer.append(line).append("\n");
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return stringBuffer.toString();
    }

    public static void main(String[] args) throws Exception {
        String filePath = Directory.getCurrentDirectory(TextFile.class)
                + File.separator + "TextFile.java";
        String file = read(filePath);
        System.out.println(file);

        TreeSet<String> treeSet = new TreeSet<>(new TextFile(filePath,"\\W+"));
        System.out.println(treeSet.headSet("a"));
    }
}
