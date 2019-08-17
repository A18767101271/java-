package kotlin_.system_practise


/**
 * 条件语句
 * Created by wislie on 2019/1/21.
 */
fun main(args: Array<String>) {

    judgeIf()

    var arr: IntArray = intArrayOf(1, 2, 3, 4)
    for (index in arr.indices) {
        judgeWhen(arr[index])
    }

    traversalWhile()

}

fun judgeIf() {
    val bool = false
    var str = if (bool) {
        "天凉好个秋"
    } else {
        "路遥知马力"
    }
    println(str)
}

fun judgeWhen(count: Int) {
    var str = ""
    when (count) {

        1, 3 -> str = "有舍有得"
        2 -> str = "选择大于努力"
        else -> str = "只要你向着目标努力，没有人能阻挡你"
    }
    println(str)
}

fun traversalWhile() {
    var arr: Array<String> = arrayOf("每次想起你", "总是大风起", "每次看到你", "却又箭如雨")
    var i = 0;
    while (i < arr.size) {
        var str = "${arr[i]}"
        println(str)
        i++
    }
}