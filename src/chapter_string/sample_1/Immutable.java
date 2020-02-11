package chapter_string.sample_1;

import chapter_rtti.Cat;

/**
 * 字符串不可变
 * Created by wislie on 2018/11/5.
 */
public class Immutable {

    public static void main(String[] args) {

        String name = "wislie is zhuyuli";
        //upcase:WISLIE IS ZHUYULI
        System.out.println("upcase:" + name.toUpperCase());
        //replace:w0sl0e 0s zhuyul0
        System.out.println("replace:" + name.replace('i', '0'));
        //name:wislie is zhuyuli
        System.out.println("name:" + name);

        Cat s1 = new Cat("kit");

        Cat s2 = s1;

        s1 = new Cat("bet");
        System.out.println("s1:" + s1 + " ,s2:" + s2);

        System.out.println("abc:"+name.substring(0, 0));

        queryStringLength();
    }

    private static void queryStringLength(){
        int len = (int) Math.pow(2,16);
        String str = "";

        for(int i = 0; i < len;i++){
            str += "a";
        }
        System.out.println(str.length());
    }
}
