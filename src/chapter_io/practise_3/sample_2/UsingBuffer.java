package chapter_io.practise_3.sample_2;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Arrays;

/**
 * Created by wislie on 2018/12/10.
 */
public class UsingBuffer {

    private static void using(CharBuffer buffer) {

        while (buffer.hasRemaining()) {
            buffer.mark(); //记录position的位置
            char c1 = buffer.get(); //get一次 position的值会+1

            int c_remaining = buffer.remaining();
            if (c_remaining > 0) {
                char c2 = buffer.get();
                buffer.reset(); //将mark的position设置为当前的position
                buffer.put(c2).put(c1); //put一次  position的值会+1
            }
        }
    }

    public static void main(String[] args) {

        char[] data = "wislieisold".toCharArray();
        ByteBuffer byteBuffer = ByteBuffer.allocate(data.length * 2);
        CharBuffer charBuffer = byteBuffer.asCharBuffer();
        charBuffer.put(data);
        System.out.println(charBuffer.rewind()); //wislieisold

        using(charBuffer);
        System.out.println(charBuffer.rewind());//iwlseisilod

        using(charBuffer);
        System.out.println(charBuffer.rewind());//wislieisold
    }
}
