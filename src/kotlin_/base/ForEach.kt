package kotlin_.base

/**
 * 遍历
 * Created by wislie on 2018/10/15.
 */

fun main(args: Array<String>) {

    var items = listOf("wislie"," kotlin", "fancy");
    for(item in items){
        println(item);
    }

    for(index in items.indices){
        println("item at $index is ${items[index]}")
    }


}