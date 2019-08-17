package kotlin_.base

/**
 * Created by wislie on 2018/10/15.
 */

fun main(args: Array<String>) {

    val x = 10;
    val max = 9;
    if (x in 1..max + 1) {
        println("fit in range");
    }

    if (x !in 5..max) {
        println("not fit in range");
    }

    var fruits = listOf("banana", " avocado", "apple", "kiwi");
    fruits.filter { it.startsWith("a") }.sortedBy { it }.map { it.toUpperCase() }.forEach{println(it)};

}