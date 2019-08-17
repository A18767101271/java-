package chapter_deep_collection.practise_6.sample_5;

/**
 * hashCode值并非独一无二
 * Created by wislie on 2018/12/5.
 */
public class HashCodeString {

    protected String hc;

    public HashCodeString(String hc) {
        this.hc = hc;
    }

    @Override
    public int hashCode() {
        int result = 15;
        result = result * 20 + hc.hashCode();
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof HashCodeString && hc.equals(((HashCodeString) obj).hc);
    }

    public static void main(String[] args) {

        HashCodeString code_1 = new HashCodeString("code_1");

        HashCodeString code_2 = new HashCodeString("code_1");

        System.out.println("code_1:" + code_1.hashCode() + "\ncode_2:" + code_2.hashCode() +
                "\ncode_1==code_2:" + (code_1 == code_2) + "\ncode_1.equals(code_2):" +
                code_1.equals(code_2));
    }
}
