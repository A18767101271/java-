package chapter_io.practise_4.sample_3;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

/**
 * Created by wislie on 2018/12/13.
 */
public class Blip implements Externalizable {

//    Blip() {}

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        System.out.println("blip writeExternal");
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        System.out.println("blip readExternal");
    }
}
