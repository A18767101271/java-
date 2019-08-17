package chapter_io.practise_2.sample_1;

import chapter_io.FileUtil;

import java.io.*;


/**
 * DataOutputStream 和 DataInputStream 写入和读取的类型一一对应
 * Created by wislie on 2018/12/7.
 */
public class DataStream {

    public static void main(String[] args) {
        //创建文件
        File file = FileUtil.createNewFile("./src/test.txt");
        DataOutputStream dos = null;
        DataInputStream dis = null;
        try {
            dos = new DataOutputStream(new FileOutputStream(file));

            dis = new DataInputStream(new FileInputStream(file));

            dos.writeInt(10);
            dos.writeBoolean(true);
            dos.writeUTF(String.valueOf("写入DataOutputStream数据"));

            int retInt = dis.readInt(); //10
            boolean retBoolean = dis.readBoolean(); //true
            String retUTF = dis.readUTF(); //写入DataOutputStream数据
            System.out.println(retInt + "\n" + retBoolean + "\n" + retUTF);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (dos != null) {
                    dos.close();
                }
                if (dis != null) {
                    dis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
