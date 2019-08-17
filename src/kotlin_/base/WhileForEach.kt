package kotlin_.base

/**
 * while 循环
 * Created by wislie on 2018/10/15.
 */


fun main(args: Array<String>) {
    var items = listOf("wislie"," needs", "to study", " diligently");
    var index = 0;
    while(index < items.size){
        println( "$index is ${items[index]}");
        index++;
    }
}