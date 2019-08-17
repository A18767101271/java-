package kotlin_.system_practise

/**
 * 对数组进行遍历
 * Created by wislie on 2019/1/18.
 */


fun main(args: Array<String>) {

    var int_array: Array<Int> = arrayOf(1, 2, 3)

    for (i: Int in int_array) {
        print(i.toString() + " ")
    }

    println()
    for (i in int_array.indices) {
        print(int_array[i].toString() + " ")
    }

    var items = listOf("wislie", "park", "nash")
    for (item in items) {
        print(item)
    }
}


