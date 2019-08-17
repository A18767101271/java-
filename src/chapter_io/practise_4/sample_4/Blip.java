package chapter_io.practise_4.sample_4;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

/**
 * Created by wislie on 2018/12/13.
 */
public class Blip implements Externalizable {

    private String name;
    private int age;

    public Blip(){}
    public Blip(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(name);
        out.write(age);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        name = in.readUTF();
        age = in.read();
    }

    @Override
    public String toString() {
        return "name:" + name + " age:" + age;
    }
}
