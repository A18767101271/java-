package chapter_io.practise_3.sample_1;

import java.nio.ByteBuffer;

/**
 * Created by wislie on 2018/12/9.
 */
public class BasicByteBuffer {

    public static void main(String[] args) {
        ByteBuffer bb = ByteBuffer.allocate(1024);
        bb.asCharBuffer().put('w');
        System.out.println(bb.getChar());

        bb.asDoubleBuffer().put(12.3);
        System.out.println(bb.getDouble());

        bb.asFloatBuffer().put(12.1f);
        System.out.println(bb.getFloat());

        bb.asIntBuffer().put(12);
        System.out.println(bb.getInt());

        bb.asLongBuffer().put(12000L);
        System.out.println(bb.getLong());

        bb.asShortBuffer().put((short) 127);
        System.out.println(bb.getShort());
    }
}
