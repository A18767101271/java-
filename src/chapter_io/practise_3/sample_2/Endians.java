package chapter_io.practise_3.sample_2;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;

/**
 * ByteBuffer高低位设置
 * Created by wislie on 2018/12/10.
 */
public class Endians {

    public static void main(String[] args) {

        ByteBuffer byteBuffer = ByteBuffer.allocate(13);
        byteBuffer.asCharBuffer().put("abcde");
        byte[] bytes = byteBuffer.array();
        //默认高位优先
        System.out.println(Arrays.toString(bytes));
//      [0, 97, 0, 98, 0, 99, 0, 100, 0, 101, 0, 0, 0]

        byteBuffer.rewind(); //倒回
        byteBuffer.order(ByteOrder.LITTLE_ENDIAN); //设置为低位优先
        byteBuffer.asCharBuffer().put("abcde");
        System.out.println(Arrays.toString(bytes));
//      [97, 0, 98, 0, 99, 0, 100, 0, 101, 0, 0, 0, 0]

        byteBuffer.rewind(); //倒回
        byteBuffer.order(ByteOrder.BIG_ENDIAN);//设置为高位优先
        byteBuffer.asCharBuffer().put("abcde");
        System.out.println(Arrays.toString(bytes));
//      [0, 97, 0, 98, 0, 99, 0, 100, 0, 101, 0, 0, 0]
    }
}
