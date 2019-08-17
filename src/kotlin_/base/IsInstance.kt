package kotlin_.base

/**
 * 所属关系
 * Created by wislie on 2018/10/15.
 */
fun main(args: Array<String>) {

    fun printLength(obj: Any) {
        println("'$obj' string length is ${getStringLength(obj) ?: "... err, not a string"}");
    }

    printLength(111);
    printLength("字符串");
}

fun getStringLength(obj: Any): Int? {
    if (obj is String) {
        return obj.length;
    }
    return null;
}