package kotlin_.base

/**
 * when选择
 * Created by wislie on 2018/10/15.
 */


fun main(args: Array<String>) {

    println(describe("wislie"));
    println(describe(13));
    println(describe('t'));
    println(describe("23.5"));
}


fun describe(obj: Any): String =
        when (obj) {

            "wislie" -> "will be different";
            is Int -> "is a number";
            !is String -> "is not a string";
            else -> "is nothing changed";
        }
