package kotlin_.base

/**
 * Created by wislie on 2019/1/14.
 */

fun main(args: Array<String>) {

    //************字符串************//
    //用for循环迭代字符串
    val st = "wislie";
    for (c in st) {
        print(c);
    }

    //转义字符串可以有转义字符，以及转义字符串可以包含换行和任意文本
    val n = "jiayou,wislie\n";
    println(n);

    //*****************字符串模版*******************//
    //模版表达式以美元符($)开头,由一个简单的名字构成
    val i = 10;
    val c = "i=$i";
    println(c);//i=10

    //花括号扩起来的任意表达式
    val s = "abc";
    val str = "$s.length is ${s.length}";
    println(str);//abc.length is 3

    //需要在原生字符串中表示字面值$字符
    val price = "${'$'}9.99";
    println(price);


    val asc = Array(5, { i -> (i * i).toString() });
    for (v in asc) {
        print(v + " "); //0 1 4 9 16
    }

    val x: Int = 1;

    when (x) {
        1 -> println("x == 1");
        2 -> println("x==2");
        else -> println("x is neither 1 nor 2");
    }
}