package kotlin_.system_practise

/**
 * 泛型函数
 * Created by wislie on 2019/1/24.
 */

fun <T> Array<T>.swap(pos1: Int, pos2: Int) { //扩展函数
    val temp = this[pos1];
    this[pos1] = this[pos2]
    this[pos2] = temp
}

fun fac(n: Int): Int {
    if (n <= 1) return n
    else return n * fac(n - 1)
}

fun <T> maxData(array: Array<T>, bigger: (T, T) -> Boolean): T? {

    var max: T? = null

    for (index in array.indices) {
        if (max == null || bigger(array[index], max)) {
            max = array[index]
        }
    }
    return max
}


fun main(args: Array<String>) {

    val arr: Array<Int> = arrayOf(1, 3, 5, 7, 4)
    arr.swap(1, 2)
    var str = ""
    for (index in arr.indices) {
        str = str + arr[index] + ", "
    }
    println(str) //1 5 3 7

    val value = fac(5)
    println(value)

    var max = maxData(arr, { a, b -> a > b })
    println("max:" + max)

}

